import ApiError from "../exceptions/api.error.js";
import pool from "../db.js";

class GraphService {

  async getData(user_id, from, to, category_id) {
    try {
      return (await pool.query(`select value, time
                                from data.transaction
                                where ${category_id ? `category_id = ${category_id}` : `user_id = ${user_id}`}
                                  and time >= '${from}'
                                  and time <= '${to}'`)).rows
    } catch (e) {
      console.log(e)
      throw new ApiError(500, 'DB no response')
    }
  }

  async getDataAboutCategory(board_id, from, to, type) {
    try {
      //Улучшить с помощью оптимизированного SQL запроса !DONE
      return (await pool.query(`
          select sum(transaction.value)::integer as value, transaction.category_id as id, category.name
          from data.transaction,
               data.category
          where transaction.category_id=category.id
              ${type === null ? '' : type <= 0 ? 'and value <= 0' : 'and value > 0'}
            and time >= '${from}'
            and time <= '${to}'
          group by category_id,name
      `)).rows
    } catch (e) {
      console.log(e)
      throw new ApiError(500, 'DB no response ')
    }
  }

}

export default new GraphService()