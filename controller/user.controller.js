
import userService from "../service/user.service.js";
import {validationResult} from 'express-validator'
import ApiError from "../exceptions/api.error.js";
class UserController {


  async registration(req, res,next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest('Пользователь передал не верные данные',errors[0])
      }
      const { username, email, password } = req.body
      const userData = await userService.registration<User>(username, email, password)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)

    } catch (e) {
      next(e)
    }

  }


  async login(req, res,next) {
    try {
      const { email, password } = req.body
      const userData = await userService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }


  async logout(req, res){
    const {refreshToken} = req.cookies
    const token = await userService.logout(refreshToken)
    res.clearCookie('refreshToken')
    return res.json(token)
  }

  
  async refresh(req, res,next){
    try {
      const {refreshToken} = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
      
    } catch (e) {
      next(e)
    }
  }

  async updatePassword(req, res) {
    try {

    } catch (e) {
      console.log(e);
    }
  }
  async updateEmail(req, res) {
    try {

    } catch (e) {
      console.log(e);
    }
  }


  async activate(req, res,next) {
    try {
      const activationLink = req.params.link
      await userService.activate(activationLink)
      return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      next(e)
    }

  }
}

export default new UserController()