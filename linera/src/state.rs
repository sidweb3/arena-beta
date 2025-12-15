use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Clone, Debug, Deserialize, Serialize, Default)]
pub struct AgentArena {
    pub duels: HashMap<String, Duel>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Duel {
    pub id: String,
    pub creator: String,
    pub participants: Vec<Participant>,
    pub market_event: String,
    pub status: DuelStatus,
    pub bets: Vec<Bet>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Participant {
    pub id: String,
    pub name: String,
    pub is_agent: bool,
}

#[derive(Clone, Debug, Deserialize, Serialize, PartialEq)]
pub enum DuelStatus {
    Waiting,
    Active,
    Resolved { winner_id: String },
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Bet {
    pub bettor: String,
    pub amount: f64,
    pub prediction: String,
}
