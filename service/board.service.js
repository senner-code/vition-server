import pool from "../db.js";

class boardService {

  async createBoard(name, admin_id) {
    return (await pool.query('insert into data.board (name, admin_id) values ($1, $2) returning *', [name, admin_id]))
      .rows[0]
  }

  async getBoardByUserID(userID) {
    return (await pool.query('select * from data.board where admin_id = $1', [userID])).rows
  }

}

export default new boardService()