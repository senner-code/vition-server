import express from 'express'
import CategoryController from '../controller/category.contoller.js'

const router = express()

router.post('/create', CategoryController.createCategory)
router.get('/getall/:boardID', CategoryController.getCategories)
router.get('/get/:id', CategoryController.getCategory)

export default router