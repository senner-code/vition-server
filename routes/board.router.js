import express from 'express'
import boardController from '../controller/board.controller.js';
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post(
  '/add',
  boardController.createBoard
)

export default router