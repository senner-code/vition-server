import express from 'express'
import boardController from '../controller/board.controller.js';

const router = express.Router()

router.post('/create',boardController.createBoard)
router.get('/getall/:id', boardController.getBoards)
router.get('/get/:id', boardController.getBoardByUserID)



export default router