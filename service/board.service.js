import pool from "../db.js";

class boardService {

  async createBoard(name,admin_id){
    const data = await pool.query('insert into data.board (name, admin_id) values ($1, $2) returning *', [name, admin_id])
    return data.rows[0]
  }


  async getBoards(userID) {
    const boards = await pool.query('select * from data.board where admin_id = $1', [userID])
    return boards
  }

}

export default new boardService()