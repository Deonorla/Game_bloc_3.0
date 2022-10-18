use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LazyOption, LookupMap, LookupSet, UnorderedMap, UnorderedSet};
use near_sdk::json_types::{Base64VecU8, U128};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{
    env, near_bindgen, require, AccountId, Balance, BorshStorageKey, CryptoHash, PanicOnDefault,
    Promise, PromiseOrValue, log

};
use std::collections::HashMap;

const TOURNAMENT_NUMBER: u8 = 1;
// 5 Ⓝ in yoctoNEAR
const PRIZE_AMOUNT: u128 = 5_000_000_000_000_000_000_000_000;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Crossword {
    owner_id: AccountId,
    tournaments: LookupMap<String, Tournament>,
    open_tournaments: UnorderedSet<String>,
}

#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct Tournament {
    status: TournamentStatus,  // ⟵ An enum we'll get to soon
    /// Use the CoordinatePair assuming the origin is (0, 0) in the top left side of the tournament.
    user: Vec<User>,  // ⟵ Another struct we've defined
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct User {
    user_id: AccountId,
    age: u8,
    status: Status,  // ⟵ Another struct we've defined
    wins: u8,
    username: String,
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct JsonTournament {
    /// The human-readable (not in bytes) hash of the tournamentId
    tournamentId_hash: String,  // ⟵ this field is not contained in the Tournament struct
    status: TournamentStatus,
    user: Vec<User>,
}

// #[derive(Serialize, Deserialize)]
// #[serde(crate = "near_sdk::serde")]
// pub struct StorageBalance {
//     pub total: U128,
//     pub available: U128,
// }
//
// // …
// // Logic that calls the nDAI token contract, asking for alice.near's storage balance.
// // …
//
// #[private]
// pub fn my_callback(&mut self, #[callback] storage_balance: StorageBalance) {
//     // …
// }


///enums
#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum Status {
    Online,
    Offline,
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum TournamentStatus {
    AcceptingPlayers,
    GameInProgress,
    GameCompleted,
}






#[near_bindgen]
impl Crossword {
    #[init]
    pub fn new(owner_id: AccountId) -> Self {
        Self {
            owner_id,
            tournaments: LookupMap::new(b"c"),
            open_tournaments: UnorderedSet::new(b"u"),
        }
    }
    pub fn new_tournament(&mut self, tournamentId_hash: String, users: Vec<User>) {
        assert_eq!(
            env::predecessor_account_id(),
            self.owner_id,
            "Only the owner may call this method"
        );
        let existing = self.tournaments.insert(
            &tournamentId_hash,
            &Tournament {
                status: TournamentStatus::AcceptingPlayers,
                user: users,
            },
        );

        assert!(existing.is_none(), "Tournament with that key already exists");
        self.open_tournaments.insert(&tournamentId_hash);
    }
    pub fn start_tournament(&mut self,tournamentId: String) -> () {
            let hashed_input = env::sha256(tournamentId.as_bytes());
            let hashed_input_hex = hex::encode(&hashed_input);
        let mut tournament = self
                .tournaments
                .get(&hashed_input_hex)
                .expect("ERR_NOT_CORRECT_USER");
        
        
        tournament.status = match tournament.status {
                    TournamentStatus::GameInProgress => TournamentStatus::GameInProgress,
                    _ => {
                        env::panic_str("ERR_GAME_IN_PROGRESS");
                    }
                };

        // Reinsert the tournament back in after we modified the status:
        self.tournaments.insert(&hashed_input_hex, &tournament);
        // Remove from the list of unsolved ones
        self.open_tournaments.remove(&hashed_input_hex);
        tournament.status;
    }

    // pub fn join_tournament(&self, user_id: AccountId, age: u8, wins: u8, username: String, tournamentId: String){
    //     let mut user =  User {
    //         user_id,
    //         age,
    //         status: Status::Online,  // ⟵ Another struct we've defined
    //         wins,
    //         username,
    //     };
    //     self.tournaments.user.insert(&user);
    //
    //     self.tournaments.user = match self.tournaments.user {
    //         TournamentStatus::GameInProgress => self.tournaments.user.insert(&user),
    //         _ => {
    //             env::panic_str("ERR_GAME_IN_PROGRESS");
    //         }
    //     };
    //
    // }


    pub fn end_tournament(&mut self, users: Vec<User>, tournamentId: String) {
    //     let hashed_input = env::sha256(tournamentId.as_bytes());
    //     let hashed_input_hex = hex::encode(&hashed_input);
    //
    //     // Check to see if the hashed user is among the tournaments
    //     let mut tournament = self
    //         .tournaments
    //         .get(&hashed_input_hex)
    //         .expect("ERR_NOT_CORRECT_USER");
    //
    //     // Check if the tournament is already solved. If it's unsolved, set the status to solved,
    //     //   then proceed to update the tournament and pay the winner.
    //     tournament.status = match tournament.status {
    //         TournamentStatus::Unsolved => TournamentStatus::Solved { memo: memo.clone() },
    //         _ => {
    //             env::panic_str("ERR_TOURNAMENT_SOLVED");
    //         }
    //     };
    //
    //     // Reinsert the tournament back in after we modified the status:
    //     self.tournaments.insert(&hashed_input_hex, &tournament);
    //     // Remove from the list of unsolved ones
    //     self.open_tournaments.remove(&hashed_input_hex);
    //
    //     log!(
    //     "Tournament with tournamentId hash {} solved, with memo: {}",
    //     hashed_input_hex,
    //     memo
    // );

        // Transfer the prize money to the winner
        Promise::new(env::predecessor_account_id()).transfer(PRIZE_AMOUNT);
    }
}
