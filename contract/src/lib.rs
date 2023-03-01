use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedMap, UnorderedSet};
use near_sdk::json_types::U128;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::Promise;
use near_sdk::{env, log, near_bindgen, AccountId};

mod token_transfer;

// const TOURNAMENT_NUMBER: u8 = 1;
// // 5 Ⓝ in yoctoNEAR
// const PRIZE_AMOUNT: U128 = near_sdk::json_types::U128(5_000_000_000_000_000_000_000_000);

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct GameBloc {
    pub beneficiary: AccountId,
    pub payments: UnorderedMap<AccountId, u128>,
    accounts: UnorderedMap<AccountId, UnorderedSet<String>>,
    users: LookupMap<AccountId, User>,
    tournaments: LookupMap<String, Tournament>,
    tournament_ids: UnorderedSet<String>,
    crowd_funded_tournaments: LookupMap<String, Tournament>,
    crowd_funded_tournament_ids: UnorderedSet<String>,
}

#[derive(BorshDeserialize, BorshSerialize, Debug, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Tournament {
    owner_id: AccountId,
    status: TournamentStatus,
    game: String,
    user: Vec<AccountId>,
    // ⟵ Another struct we've defined
    total_prize: U128,
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct User {
    user_id: AccountId,
    age: u8,
    status: Status,
    // ⟵ Another struct we've defined
    wins: u8,
    username: String,
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct JsonTournament {
    /// The human-readable (not in bytes) hash of the tournament_id
    owner_id: AccountId,
    tournament_id_hash: String,
    status: TournamentStatus,
    // game: String,
    user: Vec<AccountId>,
    total_prize: U128,
}

#[derive(Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct OpenTournament {
    tournament: Vec<JsonTournament>,
}

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

impl Default for GameBloc {
    fn default() -> Self {
        Self {
            beneficiary: "v1.faucet.nonofficial.testnet".parse().unwrap(),
            payments: UnorderedMap::new(b"d"),
            accounts: UnorderedMap::new(b"t"),
            tournaments: LookupMap::new(b"c"),
            users: LookupMap::new(b"c"),
            tournament_ids: UnorderedSet::new(b"u"),
            crowd_funded_tournaments: LookupMap::new(b"c"),
            crowd_funded_tournament_ids: UnorderedSet::new(b"u"),
        }
    }
}

#[near_bindgen]
impl GameBloc {
    #[init]
    pub fn new() -> Self {
        Self {
            beneficiary: "v1.faucet.nonofficial.testnet".parse().unwrap(),
            payments: UnorderedMap::new(b"d"),
            accounts: UnorderedMap::new(b"t"),
            tournaments: LookupMap::new(b"c"),
            users: LookupMap::new(b"c"),
            tournament_ids: UnorderedSet::new(b"u"),
            crowd_funded_tournaments: LookupMap::new(b"c"),
            crowd_funded_tournament_ids: UnorderedSet::new(b"u"),
        }
    }

    // Public - beneficiary getter
    pub fn get_beneficiary(&self) -> AccountId {
        self.beneficiary.clone()
    }

    // Public - but only callable by env::current_account_id(). Sets the beneficiary
    #[private]
    pub fn change_beneficiary(&mut self, beneficiary: AccountId) {
        self.beneficiary = beneficiary;
    }

    pub fn new_tournament(
        &mut self,
        owner_id: AccountId,
        tournament_id_hash: String,
        game_name: String,
        no_of_users_input: U128,
        prize_input: U128,
    ) {
        let _no_of_users: U128 = no_of_users_input;
        //.unwrap();
        let prize: U128 = prize_input;
        // assert_eq!(
        //     env::predecessor_account_id(),
        //     self.owner_id,
        //     "Only the owner may call this method"
        // );

        let existing = self.tournaments.insert(
            &tournament_id_hash,
            &Tournament {
                owner_id,
                status: TournamentStatus::AcceptingPlayers,
                game: game_name,
                user: Vec::with_capacity(50.try_into().unwrap()),
                total_prize: prize,
            },
        );

        assert!(
            existing.is_none(),
            "Tournament with that key already exists"
        );
        self.tournament_ids.insert(&tournament_id_hash);
    }

    pub fn start_tournament(&mut self, tournament_id: String) -> () {
        let mut tournament = self
            .tournaments
            .get(&tournament_id)
            .expect("ERR_NOT_CORRECT_USER");

        tournament.status = match tournament.status {
            TournamentStatus::AcceptingPlayers => TournamentStatus::GameInProgress,
            _ => {
                env::panic_str("ERR_GAME_IN_PROGRESS");
            }
        };

        // Reinsert the tournament back in after we modified the status:
        self.tournaments.insert(&tournament_id, &tournament);
        tournament.status;
    }

    pub fn join_tournament(&mut self, user_id: AccountId, tournament_id: String) -> Tournament {
        let mut tournament = self
            .tournaments
            .get(&tournament_id)
            .unwrap_or_else(|| env::panic_str("ERR_JOINING_TOURNAMENT"));

        tournament.user.push(user_id);
        self.tournaments.insert(&tournament_id, &tournament);
        return tournament;
    }

    pub fn end_tournament(&mut self, tournament_id: String) {
        let mut tournament = self
            .tournaments
            .get(&tournament_id)
            .expect("ERR_NOT_CORRECT_USER");

        tournament.status = match tournament.status {
            TournamentStatus::GameInProgress => TournamentStatus::GameCompleted,
            _ => {
                env::panic_str("ERR_GAME_IN_PROGRESS");
            }
        };

        // Reinsert the tournament back in after we modified the status:
        self.tournaments.insert(&tournament_id, &tournament);
        tournament.status;

        log!("Tournament with tournament_id hash {} completed successfully");

        // Transfer the prize money to the winner
        Promise::new(env::predecessor_account_id()).transfer(tournament.total_prize.into());
    }

    pub fn get_all_tournaments(&mut self) -> OpenTournament {
        let public_keys = self.tournament_ids.to_vec();
        let mut tournament_ids = vec![];
        for pk in public_keys {
            let tournament = self
                .tournaments
                .get(&pk)
                .unwrap_or_else(|| env::panic_str("ERR_LOADING_PUZZLE"));
            let tournament = JsonTournament {
                owner_id: tournament.owner_id,
                // game: tournament.game,
                tournament_id_hash: pk,
                status: tournament.status, // ⟵ An enum we'll get to soon
                user: tournament.user,     // ⟵ Another struct we've defined
                total_prize: tournament.total_prize,
            };
            tournament_ids.push(tournament)
        }
        OpenTournament {
            tournament: tournament_ids,
        }
    }

    pub fn get_tournaments(&mut self, tournament_id: String) -> Tournament {
        let tournament = self
            .tournaments
            .get(&tournament_id)
            .unwrap_or_else(|| env::panic_str("ERR_INCORRECT_TOURNAMENTID"));
        return tournament;
    }

    // pub fn get_all_users(&mut self) -> User {
    //     let mut users = &self
    //         .users;
    //     users;
    // }

    pub fn get_user(&mut self, owner_id: AccountId) -> User {
        let user = self
            .users
            .get(&owner_id)
            .unwrap_or_else(|| env::panic_str("ERR_INCORRECT_USERID"));
        return user;
    }

    pub fn new_crowd_funded_tournament(
        &mut self,
        owner_id: AccountId,
        tournament_id_hash: String,
        game_name: String,
        no_of_users_input: U128,
        prize_input: U128,
    ) {
        let _no_of_users: U128 = no_of_users_input;
        //.unwrap();
        let prize: U128 = prize_input;
        // assert_eq!(
        //     env::predecessor_account_id(),
        //     self.owner_id,
        //     "Only the owner may call this method"
        // );

        let existing = self.crowd_funded_tournaments.insert(
            &tournament_id_hash,
            &Tournament {
                owner_id,
                status: TournamentStatus::AcceptingPlayers,
                game: game_name,
                user: Vec::with_capacity(50.try_into().unwrap()),
                total_prize: prize,
            },
        );

        assert!(
            existing.is_none(),
            "Tournament with that key already exists"
        );
        self.crowd_funded_tournament_ids.insert(&tournament_id_hash);
    }

    pub fn start_crowd_funded_tournament(&mut self, crowd_funded_tournaments_id: String) -> () {
        let mut crowd_funded_tournaments = self
            .crowd_funded_tournaments
            .get(&crowd_funded_tournaments_id)
            .expect("ERR_NOT_CORRECT_USER");

        crowd_funded_tournaments.status = match crowd_funded_tournaments.status {
            TournamentStatus::AcceptingPlayers => TournamentStatus::GameInProgress,
            _ => {
                env::panic_str("ERR_GAME_IN_PROGRESS");
            }
        };

        // Reinsert the tournament back in after we modified the status:
        self.crowd_funded_tournaments
            .insert(&crowd_funded_tournaments_id, &crowd_funded_tournaments);
        crowd_funded_tournaments.status;
    }

    pub fn join_crowd_funded_tournament(
        &mut self,
        user_id: AccountId,
        crowd_funded_tournament_id: String,
    ) -> Tournament {
        let mut crowd_funded_tournament = self
            .crowd_funded_tournaments
            .get(&crowd_funded_tournament_id)
            .unwrap_or_else(|| env::panic_str("JOINING"));

        crowd_funded_tournament.user.push(user_id);
        self.crowd_funded_tournaments
            .insert(&crowd_funded_tournament_id, &crowd_funded_tournament);
        return crowd_funded_tournament;
    }

    pub fn end_crowd_funded_tournament(&mut self, crowd_funded_tournament_id: String) {
        let mut crowd_funded_tournament = self
            .crowd_funded_tournaments
            .get(&crowd_funded_tournament_id)
            .expect("ERR_NOT_CORRECT_USER");

        crowd_funded_tournament.status = match crowd_funded_tournament.status {
            TournamentStatus::GameInProgress => TournamentStatus::GameCompleted,
            _ => {
                env::panic_str("ERR_GAME_IN_PROGRESS");
            }
        };

        // Reinsert the tournament back in after we modified the status:
        self.crowd_funded_tournaments
            .insert(&crowd_funded_tournament_id, &crowd_funded_tournament);
        crowd_funded_tournament.status;

        log!("Tournament with tournament_id hash {} completed successfully");

        // Transfer the prize money to the winner
        Promise::new(env::predecessor_account_id())
            .transfer(crowd_funded_tournament.total_prize.into());
    }
}
