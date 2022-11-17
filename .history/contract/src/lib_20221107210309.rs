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
pub struct GameBloc {
    owner_id: AccountId,
    users: LookupMap<AccountId,User>,
    tournaments: LookupMap<String, Tournament>,
    open_tournaments: UnorderedSet<String>,
    crowd_funded_tournaments: LookupMap<String, Tournament>,
    crowd_funded_open_tournaments: UnorderedSet<String>,
}

#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct Tournament {
    owner_id: AccountId,
    status: TournamentStatus,  // ⟵ An enum we'll get to soon
    user: Vec<User>, // ⟵ Another struct we've defined
    total_prize: u128,
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
    /// The human-readable (not in bytes) hash of the tournament_id
    tournament_id_hash: String,  // ⟵ this field is not contained in the Tournament struct
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


// user that creates a tournament shouldnt be allowed to join the tournament




#[near_bindgen]
impl GameBloc {
    #[init]
    pub fn new(owner_id: AccountId) -> Self {
        Self {
            owner_id,
            tournaments: LookupMap::new(b"c"),
            users: LookupMap::new(b"c"),
            open_tournaments: UnorderedSet::new(b"u"),
            crowd_funded_tournaments: LookupMap::new(b"c"),
            crowd_funded_open_tournaments: UnorderedSet::new(b"u"),
        }
    }
    
    pub fn new_tournament(&mut self, tournament_id_hash: String, users: Vec<User>, prize: u128) {
        assert_eq!(
            env::predecessor_account_id(),
            self.owner_id,
            "Only the owner may call this method"
        );
        let existing = self.tournaments.insert(
            &tournament_id_hash,
            &Tournament {
                self.owner_id,
                status: TournamentStatus::AcceptingPlayers,
                user: users,
                total_prize: prize,
            },
        );

        assert!(existing.is_none(), "Tournament with that key already exists");
        self.open_tournaments.insert(&tournament_id_hash);
    }
    
    pub fn start_tournament(&mut self,tournament_id: String) -> () {
            let hashed_input = env::sha256(tournament_id.as_bytes());
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

    pub fn join_tournament(&self,user_id: AccountId, age: u8, wins: u8, username: String, tournament_id: String){
        assert_eq!(
            env::predecessor_account_id(),
            self.owner_id,
            "Only the owner may call this method"
        );
        let hashed_input = env::sha256(tournament_id.as_bytes());
        let hashed_input_hex = hex::encode(&hashed_input);
        let mut tournament = self
            .tournaments
            .get(&hashed_input_hex)
            .expect("ERR_NOT_CORRECT_USER");
        assert_eq!(
            env::predecessor_account_id(),
            tournament.owner_id,
            "Tournament owner cannot join this tournament"
        );
        let mut user =  User {
            user_id,
            age,
            status: Status::Online,  // ⟵ Another struct we've defined
            wins,
            username,
        };
       tournament.user.push(user);
    }

    pub fn end_tournament(&mut self, users: Vec<User>, tournament_id: String,) {
        let hashed_input = env::sha256(tournament_id.as_bytes());
        let hashed_input_hex = hex::encode(&hashed_input);
        let mut tournament = self
            .tournaments
            .get(&hashed_input_hex)
            .expect("ERR_NOT_CORRECT_USER");

        // Check to see if the hashed user is among the tournaments

        // Check if the tournament is already solved. If it's unsolved, set the status to solved,
        //   then proceed to update the tournament and pay the winner.
        tournament.status = match tournament.status {
            TournamentStatus::GameInProgress => TournamentStatus::GameCompleted,
            _ => {
                env::panic_str("ERR_TOURNAMENT_COMPLETED_ALREADY_OR_IS_CURRENTLY_ACCEPTING_PLAYERS");
            }
        };

        // Reinsert the tournament back in after we modified the status:
        self.tournaments.insert(&hashed_input_hex, &tournament);
        // Remove from the list of unsolved ones
        self.open_tournaments.remove(&hashed_input_hex);

        log!(
        "Tournament with tournament_id hash {} completed successfully",
        hashed_input_hex
    );

        // Transfer the prize money to the winner
        Promise::new(env::predecessor_account_id()).transfer(tournament.total_prize);
    }


    pub fn get_all_tournaments(&mut self) -> () {
        let mut tournaments = &self
            .open_tournaments;
        tournaments;
    }

    pub fn get_tournaments(&mut self,tournament_id: String) -> () {
        let hashed_input = env::sha256(tournament_id.as_bytes());
        let hashed_input_hex = hex::encode(&hashed_input);
        let mut tournament = self
            .tournaments
            .get(&hashed_input_hex)
            .expect("ERR_NOT_CORRECT_USER");
        tournament;
    }

    pub fn get_all_users(&mut self) -> () {
        let mut users = &self
            .users;
        users;
    }

    pub fn get_user(&mut self, owner_id: AccountId) -> () {
        let mut user = self
            .users
            .get(&owner_id)
            .expect("ERR_NOT_CORRECT_USER");
        user;
    }


    pub fn new_crowd_funded_tournament(&mut self, owner_id: AccountId, tournament_id_hash: String, users: Vec<User>, prize: u128) {
        assert_eq!(
            env::predecessor_account_id(),
            self.owner_id,
            "Only the owner may call this method"
        );
        let existing = self.tournaments.insert(
            &tournament_id_hash,
            &Tournament {
                owner_id,
                status: TournamentStatus::AcceptingPlayers,
                user: users,
                total_prize: prize,
            },
        );

        assert!(existing.is_none(), "Tournament with that key already exists");
        self.open_tournaments.insert(&tournament_id_hash);
    }

    pub fn start_crowd_funded_tournament(&mut self,tournament_id: String) -> ()
    {
        let hashed_input = env::sha256(tournament_id.as_bytes());
        let hashed_input_hex = hex::encode(&hashed_input);
        let mut tournament = self
            .tournaments
            .get(&hashed_input_hex)
            .expect("ERR_NOT_CORRECT_USER");


        tournament.status = match tournament.status {
            TournamentStatus::AcceptingPlayers => TournamentStatus::GameInProgress,
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

    pub fn join_crowd_funded_tournament(&self,user_id: AccountId, age: u8, wins: u8, username: String, tournament_id: String){
        let hashed_input = env::sha256(tournament_id.as_bytes());
        let hashed_input_hex = hex::encode(&hashed_input);
        let mut tournament = self
            .tournaments
            .get(&hashed_input_hex)
            .expect("ERR_NOT_CORRECT_USER");
        let mut user =  User {
            user_id,
            age,
            status: Status::Online,  // ⟵ Another struct we've defined
            wins,
            username,
        };
        tournament.user.push(user);
    }

    pub fn end_crowd_funded_tournament(&mut self, users: Vec<User>, tournament_id: String,) {
        let hashed_input = env::sha256(tournament_id.as_bytes());
        let hashed_input_hex = hex::encode(&hashed_input);
        let mut tournament = self
            .tournaments
            .get(&hashed_input_hex)
            .expect("ERR_NOT_CORRECT_USER");

        // Check to see if the hashed user is among the tournaments

        // Check if the tournament is already solved. If it's unsolved, set the status to solved,
        //   then proceed to update the tournament and pay the winner.
        tournament.status = match tournament.status {
            TournamentStatus::GameInProgress => TournamentStatus::GameCompleted,
            _ => {
                env::panic_str("ERR_TOURNAMENT_COMPLETED_ALREADY_OR_IS_CURRENTLY_ACCEPTING_PLAYERS");
            }
        };

        // Reinsert the tournament back in after we modified the status:
        self.tournaments.insert(&hashed_input_hex, &tournament);
        // Remove from the list of unsolved ones
        self.open_tournaments.remove(&hashed_input_hex);

        log!(
        "Tournament with tournament_id hash {} completed successfully",
        hashed_input_hex
    );

        // Transfer the prize money to the winner
        Promise::new(env::predecessor_account_id()).transfer(tournament.total_prize);
    }
}
