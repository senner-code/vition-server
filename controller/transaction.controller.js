import transactionService from "../service/transaction.service.js";

class TransactionController {
  async getTransactionByUser(req, res, next){

  }

  async addTransaction(req, res, next){
    const [value, time, description, widget_id,user_id] = req.body
    const transaction = await transactionService.addTransaction(widget_id, user_id, description || null, value , time || null)
    return res.json(transaction)
  }

  async getTransactionByWidget(req, res, next){
    const {id, from, limit} = req.params
    const transactions = await transactionService.getTransactionByWidget(id, from , limit)
    return res.json(transactions)
  }

  async getTransactionByUser(req, res, next) {
    const {id, from, limit} = req.params
    const transactions = await transactionService.getTransactionByUser(id, from, limit)
    return res.json(transactions)
  }

}

export default new TransactionController()