/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

import { utils } from 'near-api-js';

export class GameBloc {

  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse
  }

  async new_tournament(userID, tournamentID, users, prize) {
   const new_user = utils.format.parseNearAmount(users.toString())
   const no_price = utils.format.parseNearAmount(prize.toString())
    return await this.wallet.callMethod({ contractId: this.contractId, method: "new_tournament",  args: {owner_id: userID, tournament_id_hash: tournamentID, no_of_users_input: new_user, prize_input: no_price }  })
  }

   async getAllTournaments() {
    return await this.wallet.callMethod({ contractId: this.contractId, method: "get_all_tournaments", args: { }})
   }

     async initializeContract(userID) {
        return await this.wallet.callMethod({ contractId: this.contractId, method: "new",  args: {owner_id: JSON.parse(userID).accountId }  })
       }

     async startTournament() {
        return await this.wallet.callMethod({ contractId: this.contractId, method: "join_tournament", args: {owner_id: userID, tournament_id: "01GJ16DF22SGRBP58WRZMNZDQ4", }})
       }


}

