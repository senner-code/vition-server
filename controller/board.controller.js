import pool from "../db.js";

class BoardController {

  // async createUser(req, res) {
  //   const {username, email, password} = req.body
  //   const newUSer = await pool.query(`insert into users (username, email, password) values ($1, $2, $3) returning *`,[username, email, password])
  //   res.json(
  //     newUSer.rows[0]
  //   )
  // }
}

export default new BoardController()