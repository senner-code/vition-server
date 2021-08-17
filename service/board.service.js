import pool from "../db.js";

class boardService {

  async createBoard(name, admin_id) {
    const board = (await pool.query('insert into data.board (name, admin_id) values ($1, $2) returning *', [name, admin_id]))
      .rows[0]
    const user = (await pool.query(`UPDATE data.users SET boards = array_cat(boards, '{${board.id}}') where id = ${admin_id} returning *`))
      .rows[0]
    return {board, user}
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