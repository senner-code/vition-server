import CategoryService from "../service/category.widget..js"

class CategoryController {

  async createCategory(req, res, next){
    const {boardID, name} = req.body
    const category = await CategoryService.createCategory(boardID, name)
    return res.json(category)
  }

  async getCategories(req, res, next){
    const boardID = req.params.boardID
    const categories = await CategoryService.getCategories(boardID)
    return res.json(categories)
  }

  async getCategory(req, res, next){
    const categoriesID = req.params.id
    const category = await CategoryService.getCategory(categoriesID)
    return res.json(category)
  }

}

export default new CategoryController()