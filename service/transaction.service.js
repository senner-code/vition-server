import pool from "../db.js"

class TransactionService {
  async addTransaction(widget_id, user_id, description, value , time){
    const transaction = (await pool.query
    (`insert into data.transaction (widget_id, user_id, description, value) values ($1, $2, $3, $4) returning *`,
    [widget_id, user_id,description,value])).rows[0]
    await pool.query(`update data.widget set transactions = array_cat(transactions, '{${transaction.id}}') where id = ${widget_id}`)
    return transaction
  }

  async getTransactionByWidget(widget_id, from, limit){
    return (await pool.query(`select * from data.transaction where widget_id = ${widget_id} LIMIT ${limit} OFFSET ${from}`)).rows
  }

  async getTransactionByUser(user_id, from, limit){
    return (await pool.query(`select * from data.transaction where user_id = ${user_id} LIMIT ${limit} OFFSET ${from}`)).rows
  }

}

export default new TransactionService()