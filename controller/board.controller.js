import boardService from "../service/board.service.js";

class BoardController {

  //
  async createBoard(req, res, next) {
    const boardInfo = req.body
    const data = await boardService.createBoard(boardInfo.name, boardInfo.userID)
    return res.json(data)
  }

  //For Future
  async getBoards(req, res, next) {
    const userID = req.body.userID
    const boardsData = await boardService.getBoards(userID)
    return res.json(boardsData)
  }

  async getBoardByUserID(req, res, next){
    const userID = req.body.userID
    const boardData = await boardService.getBoardByUserID(userID)
    return res.json(boardData)
  }

}

export default new BoardController()