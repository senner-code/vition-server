import pool from "../db.js";
import ApiError from "../exceptions/api.error.js";

class boardService {

  async createBoard(name, admin_id) {
    try {
      return (await pool.query('insert into data.board (name, admin_id) values ($1, $2) returning *', [name, admin_id]))
        .rows[0]
    } catch (e) {
      throw new ApiError(500, 'Server error')
    }

  }

  async getBoardByUserID(userID) {
    try {
      return (await pool.query('select * from data.board where admin_id = $1', [userID])).rows
    } catch (e) {
      throw new ApiError(500, 'Server error')
    }
  }

}

export default new boardService()