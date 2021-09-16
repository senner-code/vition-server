import express from 'express'
const router = express.Router()
import GraphController from '../controller/graph.controller.js'

router.get('/all/:user_id/:from/:to', GraphController.getData)
router.get('/all/:user_id/:from/:to/:category_id', GraphController.getData)
router.get('/category/:board_id/:from/:to', GraphController.getDataAboutCategory)
router.get('/category/:board_id/:from/:to/:type', GraphController.getDataAboutCategory)

export default router