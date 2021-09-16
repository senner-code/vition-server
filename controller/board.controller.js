import boardService from "../service/board.service.js";

class BoardController {

  //
  async createBoard(req, res, next) {
    try {
      const boardInfo = req.body
      const data = await boardService.createBoard(boardInfo.name, boardInfo.userID)
      return res.json(data)
    } catch (e) {
      next(e)
    }

  }

  //For Future
  async getBoards(req, res, next) {
    try {
      const userID = req.params.id
      const boardsData = await boardService.getBoards(userID)
      return res.json(boardsData)
    } catch (e) {
      next(e)
    }

  }

  async getBoardByUserID(req, res, next) {
    try {
      const userID = req.params.id
      const boardData = await boardService.getBoardByUserID(userID)
      return res.json(boardData)
    } catch (e) {
      next(e)
    }

  }

}

export default new BoardController()