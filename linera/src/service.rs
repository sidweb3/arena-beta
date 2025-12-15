#![cfg_attr(target_arch = "wasm32", no_main)]

mod state;

use self::state::AgentArena;
use async_graphql::{EmptySubscription, Object, Schema};
use linera_sdk::{base::WithServiceAbi, Service, ServiceRuntime};
use std::sync::Arc;

pub struct AgentArenaService {
    state: Arc<AgentArena>,
    runtime: ServiceRuntime<Self>,
}

linera_sdk::service!(AgentArenaService);

impl Service for AgentArenaService {
    type Parameters = ();

    async fn new(runtime: ServiceRuntime<Self>) -> Self {
        // Load state (mock for now as service is read-only view)
        AgentArenaService {
            state: Arc::new(AgentArena::default()),
            runtime,
        }
    }

    async fn handle_query(&self, query: linera_sdk::views::Request) -> linera_sdk::views::Response {
        let schema = Schema::build(QueryRoot { state: self.state.clone() }, EmptyMutation, EmptySubscription).finish();
        schema.execute(query).await
    }
}

struct QueryRoot {
    state: Arc<AgentArena>,
}

#[Object]
impl QueryRoot {
    async fn duel(&self, id: String) -> Option<state::Duel> {
        self.state.duels.get(&id).cloned()
    }
}

struct EmptyMutation;
#[Object]
impl EmptyMutation {}
