import pool from "../db.js"

class CategoryService {
  async createCategory(boardID, name) {
    return (await pool.query(`insert into data.category (board_id, name) values ($1, $2) returning *`, [boardID, name]))
      .rows[0]
  }

  async getCategories(boardID) {
    return (await pool.query(`select * from data.category where board_id = ${boardID}`))
      .rows
  }

  async getCategory(categoryID) {

  }

}

export default new CategoryService()