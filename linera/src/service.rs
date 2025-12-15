#![cfg_attr(target_arch = "wasm32", no_main)]

mod state;

use self::state::AgentArena;
use agent_arena::{AgentArenaAbi, Duel, Bet};
use async_trait::async_trait;
use linera_sdk::{
    base::WithServiceAbi,
    Service, ServiceRuntime, ViewStateStorage,
};
use std::sync::Arc;

pub struct AgentArenaService {
    state: Arc<AgentArena>,
    runtime: ServiceRuntime<Self>,
}

linera_sdk::service!(AgentArenaService);

impl WithServiceAbi for AgentArenaService {
    type Abi = AgentArenaAbi;
}

#[async_trait]
impl Service for AgentArenaService {
    type Error = String;
    type Storage = ViewStateStorage<Self>;

    async fn new(state: Arc<AgentArena>, runtime: ServiceRuntime<Self>) -> Self {
        AgentArenaService { state, runtime }
    }

    async fn handle_query(
        &self,
        query: Self::Query,
    ) -> Result<Self::Response, Self::Error> {
        let schema = async_graphql::Schema::build(
            QueryRoot { state: self.state.clone() },
            MutationRoot,
            async_graphql::EmptySubscription,
        )
        .finish();
        Ok(schema.execute(query).await)
    }
}

struct QueryRoot {
    state: Arc<AgentArena>,
}

#[async_graphql::Object]
impl QueryRoot {
    async fn duel(&self, id: String) -> Option<Duel> {
        self.state.duels.get(&id).await.ok().flatten()
    }
    
    async fn bets(&self, duel_id: String) -> Vec<Bet> {
        self.state.bets.get(&duel_id).await.ok().flatten().unwrap_or_default()
    }
}

struct MutationRoot;

#[async_graphql::Object]
impl MutationRoot {
    async fn ping(&self) -> String {
        "pong".to_string()
    }
}
