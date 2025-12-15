#![cfg_attr(target_arch = "wasm32", no_main)]

mod state;

use self::state::{AgentArena, Duel, DuelStatus, Bet, Participant};
use linera_sdk::base::{SessionId, WithContractAbi};
use linera_sdk::views::{View, RootView};
use linera_sdk::{Contract, ContractRuntime};
use serde::{Deserialize, Serialize};

pub struct AgentArenaContract {
    state: AgentArena,
    runtime: ContractRuntime<Self>,
}

linera_sdk::contract!(AgentArenaContract);

#[derive(Deserialize, Serialize)]
pub enum Operation {
    CreateDuel {
        type_: String,
        participants: Vec<Participant>,
        market_event: String,
    },
    PlaceBet {
        duel_id: String,
        amount: f64,
        prediction: String,
        bettor: String,
    },
    ResolveDuel {
        duel_id: String,
        winner_id: String,
    },
}

#[derive(Deserialize, Serialize)]
pub enum Message {
    // Cross-chain messages if needed
}

impl Contract for AgentArenaContract {
    type Message = Message;
    type InstantiationArgument = ();
    type Parameters = ();

    async fn load(runtime: ContractRuntime<Self>) -> Self {
        // In a real app, you would load state from ViewStorage
        // For this template, we use a simple in-memory state structure
        AgentArenaContract { 
            state: AgentArena::default(), 
            runtime 
        }
    }

    async fn instantiate(&mut self, _argument: Self::InstantiationArgument) {
        // Initialization logic
    }

    async fn execute_operation(&mut self, operation: Self::Operation) -> Self::Response {
        match operation {
            Operation::CreateDuel { type_, participants, market_event } => {
                let duel_id = format!("duel_{}", self.runtime.system_time().micros());
                let duel = Duel {
                    id: duel_id.clone(),
                    creator: self.runtime.authenticated_signer().map(|s| s.to_string()).unwrap_or_default(),
                    participants,
                    market_event,
                    status: DuelStatus::Waiting,
                    bets: Vec::new(),
                };
                self.state.duels.insert(duel_id, duel);
            },
            Operation::PlaceBet { duel_id, amount, prediction, bettor } => {
                if let Some(duel) = self.state.duels.get_mut(&duel_id) {
                    let bet = Bet {
                        bettor,
                        amount,
                        prediction,
                    };
                    duel.bets.push(bet);
                }
            },
            Operation::ResolveDuel { duel_id, winner_id } => {
                 if let Some(duel) = self.state.duels.get_mut(&duel_id) {
                    duel.status = DuelStatus::Resolved { winner_id };
                    // Logic to payout would go here (transfer tokens)
                 }
            }
        }
        Self::Response::default()
    }

    async fn execute_message(&mut self, _message: Self::Message) { }
}
