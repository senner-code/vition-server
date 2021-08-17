import widgetService from "../service/widget.service.js"

class WidgetController {

  async createWidget(req, res, next){
    const {boardID, name} = req.body
    const widget = await widgetService.createWidget(boardID, name)
    return res.json(widget)
  }

  async getWidgets(req, res, next){
    const boardID = req.params.boardID
    const widgets = await widgetService.getWidgets(boardID)
    return res.json(widgets)
  }

  async getWidget(req, res, next){
    const widgetID = req.params.id
    const widget = await widgetService.getWidget(widgetID)
    return res.json(widget)
  }

}

export default new WidgetController()