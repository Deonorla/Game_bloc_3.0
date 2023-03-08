use crate::*;

#[near_bindgen]
impl GameBloc {
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
}
