#![cfg_attr(target_arch = "wasm32", no_main)]

mod state;

use self::state::AgentArena;
use agent_arena::{AgentArenaAbi, Operation, AgentArenaResponse};
use async_trait::async_trait;
use linera_sdk::{
    base::WithContractAbi,
    Contract, ContractRuntime, ViewStateStorage,
};

pub struct AgentArenaContract {
    state: AgentArena,
    runtime: ContractRuntime<Self>,
}

linera_sdk::contract!(AgentArenaContract);

impl WithContractAbi for AgentArenaContract {
    type Abi = AgentArenaAbi;
}

#[async_trait]
impl Contract for AgentArenaContract {
    type Error = String;
    type Storage = ViewStateStorage<Self>;

    async fn new(state: AgentArena, runtime: ContractRuntime<Self>) -> Self {
        AgentArenaContract { state, runtime }
    }

    fn state_mut(&mut self) -> &mut Self::State {
        &mut self.state
    }

    async fn initialize(
        &mut self,
        _argument: Self::InitializationArgument,
    ) -> Result<(), Self::Error> {
        Ok(())
    }

    async fn execute_operation(
        &mut self,
        operation: Self::Operation,
    ) -> Result<Self::Response, Self::Error> {
        match operation {
            Operation::CreateDuel { duel } => {
                self.state.duels.insert(&duel.id, duel)?;
            }
            Operation::PlaceBet { duel_id, bet } => {
                let mut bets = self.state.bets.get(&duel_id).await?.unwrap_or_default();
                bets.push(bet);
                self.state.bets.insert(&duel_id, bets)?;
            }
            Operation::ResolveDuel { duel_id, winner_id } => {
                if let Some(mut duel) = self.state.duels.get(&duel_id).await? {
                    duel.status = "resolved".to_string();
                    duel.winner_id = Some(winner_id);
                    self.state.duels.insert(&duel_id, duel)?;
                }
            }
        }
        Ok(AgentArenaResponse)
    }

    async fn execute_message(
        &mut self,
        _message: Self::Message,
    ) -> Result<(), Self::Error> {
        Ok(())
    }

    async fn store(mut self) {
        self.state.save().await.expect("Failed to save state");
    }
}
