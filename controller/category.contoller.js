import CategoryService from "../service/category.service.js"

class CategoryController {

  async createCategory(req, res, next){
    try {
      const {boardID, name} = req.body
      const category = await CategoryService.createCategory(boardID, name)
      return res.json(category)
    } catch (e) {
      next(e)
    }

  }

  async getCategories(req, res, next) {
    try {
      const boardID = req.params.boardID
      const categories = await CategoryService.getCategories(boardID)
      return res.json(categories)
    } catch (e) {
      next(e)
    }

  }

  async getCategory(req, res, next) {
    try {
      const categoriesID = req.params.id
      const category = await CategoryService.getCategory(categoriesID)
      return res.json(category)
    } catch (e) {
      next(e)
    }

  }

}

export default new CategoryController()