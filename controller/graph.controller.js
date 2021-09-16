import GraphService from '../service/graph.service.js'


class GraphController {
  async getDataAboutCategory(req,res,next){
    try{
      const {board_id, from, to, type} = req.params
      const data = await GraphService.getDataAboutCategory(board_id,from,to, type || null)
      res.json(data)
    }catch (e) {
      next(e)
    }
  }

  async getData(req, res, next){
    try{
      const {category_id,user_id, from, to} = req.params
      const data = await GraphService.getData(user_id, from, to ,category_id || null)
      res.json(data)
    }catch (e) {
      next(e)
    }

  }

}

export default new GraphController()