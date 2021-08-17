import express from 'express'
import transactionController from '../controller/transaction.controller.js'

const router = express()

router.post('/create', transactionController.addTransaction)
router.get('/getbywidget/:id/:from/:limit',transactionController.getTransactionByWidget)
router.get('/getbyuser/:id/:from/:limit', transactionController.getTransactionByUser)


export default router