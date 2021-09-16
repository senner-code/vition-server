import transactionService from "../service/transaction.service.js";

class TransactionController {
  async addTransaction(req, res, next){
    const [value, time, description, category_id,user_id, currency] = req.body
    const transaction = await transactionService.addTransaction(category_id, user_id, description || null, value , time || null, currency)
    return res.json(transaction)
  }

  async getTransactionByCategory(req, res, next){
    const {id, from, limit} = req.params
    const transactions = await transactionService.getTransactionByCategory(id, from , limit)
    return res.json(transactions)
  }

  async getTransactionByUser(req, res, next) {
    const {id, from, limit} = req.params
    const transactions = await transactionService.getTransactionByUser(id, from, limit)
    return res.json(transactions)
  }

}

export default new TransactionController()