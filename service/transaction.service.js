import pool from "../db.js"

class TransactionService {
  async addTransaction(category_id, user_id, description, value, time, currency) {

    //Time = 2021 09 11
    //transaction.time = 2021-08-10T21:00:00.000Z
    await pool.query(`select * from data.category where id = ${category_id}`)
      .then(async (category) => {
        const newValue = category.rows[0].total_value + Number(value)
        await pool.query(`update data.category set total_value = ${newValue} where id = ${category_id}`)
      })


    return (await pool.query
    (`insert into data.transaction (category_id, user_id, description, value,time) 
    values ($1, $2, $3, $4 , $5) returning *`,
      [category_id, user_id, description, value, time])).rows[0]
  }

  async getTransactionByCategory(category_id, from, limit) {
    return (await pool.query(`select * from data.transaction where category_id = ${category_id} order by id desc  LIMIT ${limit} OFFSET ${from}`)).rows
  }

  async getTransactionByUser(user_id, from, limit) {
    const transactions = (await pool.query(`select * from data.transaction where user_id = ${user_id} order by id desc  LIMIT ${limit} OFFSET ${from}`)).rows
    const count = (await pool.query(`select count(*) from data.transaction where user_id = ${user_id}`)).rows[0]
    return {transactions , count}
  }

}

export default new TransactionService()