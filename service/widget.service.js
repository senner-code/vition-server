import pool from "../db.js"

class WidgetService { 
  async createWidget(boardID,name){
    const widget = (await pool.query(`insert into data.widget (board_id, name) values ($1, $2) returning *`,[boardID, name]))
      .rows[0]
    await pool.query(`UPDATE data.board set widgets = array_cat(widgets, '{${widget.id}}') where id = ${boardID}`)
    return widget
  }
  async getWidgets(boardID){
    const widgets = (await pool.query(`select * from data.widget where board_id = ${boardID}`))
      .rows
    return widgets
  }

  async getWidget(widgetID){
    const widget = (await pool.query(`select * from data.widget where id = ${widgetID}`)).rows[0]
    return widget
  }
}
export default new WidgetService()