use async_graphql::{Request, Response, SimpleObject, InputObject};
use linera_sdk::base::{ContractAbi, ServiceAbi};
use serde::{Deserialize, Serialize};

pub struct AgentArenaAbi;

impl ContractAbi for AgentArenaAbi {
    type InitializationArgument = ();
    type Parameters = ();
    type Operation = Operation;
    type Response = AgentArenaResponse;
}

impl ServiceAbi for AgentArenaAbi {
    type Parameters = ();
    type Query = Request;
    type QueryResponse = Response;
}

#[derive(Debug, Deserialize, Serialize, Default)]
pub struct AgentArenaResponse;

#[derive(Debug, Deserialize, Serialize)]
pub enum Operation {
    CreateDuel { duel: Duel },
    PlaceBet { duel_id: String, bet: Bet },
    ResolveDuel { duel_id: String, winner_id: String },
}

#[derive(Clone, Debug, Deserialize, Serialize, SimpleObject, InputObject)]
pub struct Duel {
    pub id: String,
    pub status: String, // "waiting", "active", "resolved"
    pub participants: Vec<Participant>,
    pub market_event: String,
    pub winner_id: Option<String>,
}

#[derive(Clone, Debug, Deserialize, Serialize, SimpleObject, InputObject)]
pub struct Participant {
    pub id: String,
    pub name: String,
    pub is_agent: bool,
}

#[derive(Clone, Debug, Deserialize, Serialize, SimpleObject, InputObject)]
pub struct Bet {
    pub bettor: String,
    pub amount: f64,
    pub prediction: String,
}
