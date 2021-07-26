import pool from "../db.js";
import boardService from "../service/board.service.js";

class BoardController {

  async createBoard(req, res, next) {
    const boardInfo = req.body
    const data = await boardService.createBoard(boardInfo.name, boardInfo.userID)
    return res.json(data)
  }

  async getBoard(req, res, next) {
    const userId = req.body.id
    return boardService.getBoards(userId)
  }

}

export default new BoardController()