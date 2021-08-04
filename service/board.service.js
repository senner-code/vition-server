import pool from "../db.js";

class boardService {

  async createBoard(name, admin_id) {
    const data = (await pool.query('insert into data.board (name, admin_id) values ($1, $2) returning *', [name, admin_id])).rows[0]
    await pool.query(`UPDATE data.users SET boards = array_cat(boards, '{${data.id}}') where id = ${admin_id}`)
    return data
  }

  async getBoards(userID) {
    const boards = (await pool.query('select * from data.board where admin_id = $1', [userID])).rows
    return boards
  }

  async getBoardByUserID(userID) {
    const board = (await pool.query('select * from data.board where admin_id = $1', [userID])).rows
    return board
  }

}

export default new boardService()