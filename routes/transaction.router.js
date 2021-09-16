import express from 'express'
import transactionController from '../controller/transaction.controller.js'

const router = express()

router.post('/create', transactionController.addTransaction)
router.get('/getbycategory/:id/:from/:limit',transactionController.getTransactionByCategory)
router.get('/getbyuser/:id/:from/:limit', transactionController.getTransactionByUser)


export default router