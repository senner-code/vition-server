import pool from "../db.js"
import ApiError from "../exceptions/api.error.js";

class CategoryService {
  async createCategory(boardID, name) {
    try {
      return (await pool.query(`insert into data.category (board_id, name)
                                values ($1, $2)
                                returning *`, [boardID, name]))
        .rows[0]
    } catch (e) {
      throw new ApiError(500, 'Server error')
    }

  }

  async getCategories(boardID) {
    try {
      return (await pool.query(`select *
                                from data.category
                                where board_id = ${boardID}`))
        .rows
    } catch (e) {
      throw new ApiError(500, 'Server error')
    }

  }

  async getCategory(categoryID) {
    try {

    } catch (e) {
      throw new ApiError(500, 'Server error')
    }
  }

}

export default new CategoryService()