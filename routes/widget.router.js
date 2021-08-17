import express from 'express'
import widgetContoller from '../controller/widget.contoller.js'

const router = express()

router.post('/create', widgetContoller.createWidget)
router.get('/getall/:boardID', widgetContoller.getWidgets)
router.get('/get/:id', widgetContoller.getWidget)

export default router