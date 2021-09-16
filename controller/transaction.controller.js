import transactionService from "../service/transaction.service.js";

class TransactionController {

  async addTransaction(req, res, next){
    try {
      const [value, time, description, category_id, user_id, currency] = req.body
      const transaction = await transactionService.addTransaction(category_id, user_id, description || null, value, time || null, currency)
      return res.json(transaction)
    } catch (e) {
      next(e)
    }

  }

  async getTransactionByCategory(req, res, next) {
    try {
      const {id, from, limit} = req.params
      const transactions = await transactionService.getTransactionByCategory(id, from, limit)
      return res.json(transactions)
    } catch (e) {
      next(e)
    }

  }

  async getTransactionByUser(req, res, next) {
    try {
      const {id, from, limit} = req.params
      const transactions = await transactionService.getTransactionByUser(id, from, limit)
      return res.json(transactions)
    } catch (e) {
      next(e)
    }

  }

}

export default new TransactionController()