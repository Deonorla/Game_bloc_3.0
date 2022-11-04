/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

import { utils } from 'near-api-js';

export class GameBloc {

  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse
  }

  async getUsers() {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: "get_all_users" })
  }



  // async getMessages() {
  //   const messages = await this.wallet.viewMethod({ contractId: this.contractId, method: "get_messages" })
  //   console.log(messages)
  //   return messages
  // }

  // async addMessage(message, donation) {
  //   const deposit = utils.format.parseNearAmount(donation);
  //   return await this.wallet.callMethod({ contractId: this.contractId, method: "add_message", args: { text: message }, deposit });
  // }

}

console.log(getUsers())