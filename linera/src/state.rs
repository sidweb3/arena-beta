use linera_sdk::views::{MapView, RootView, ViewStorageContext};
use crate::{Duel, Bet};

#[derive(RootView, async_graphql::SimpleObject)]
#[view(context = "ViewStorageContext")]
pub struct AgentArena {
    pub duels: MapView<String, Duel>,
    pub bets: MapView<String, Vec<Bet>>,
}
