import express from 'express'
import boardController from '../controller/board.controller.js';
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post('/create',boardController.createBoard)
router.post('/getall', boardController.getBoards)
router.post('/getboard', boardController.getBoardByUserID)

export default router