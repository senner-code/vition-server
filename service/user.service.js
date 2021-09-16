import pool from "../db.js";
import bcrypt from 'bcrypt'
import * as uuid from "uuid"
import mailService from "./mail.service.js";
import UserDto from "../dtos/user.dto.js";
import tokenService from "./token.service.js";
import ApiError from "../exceptions/api.error.js";


class UserService {
  async registration(username, email, password) {
    const candidate = (await pool.query(`select *
                                         from data.users
                                         where email = $1`, [email])).rowCount
    if (candidate > 0) {
      throw ApiError.BadRequest('Неверные данные или данный email зарегистрирован')
    }
    try {
      const hashPassword = await bcrypt.hash(password, 3)
      const activationLink = uuid.v4()
      const user = (await pool.query(`insert into data.users (username, email, password, link)
                                      values ($1, $2, $3, $4)
                                      returning *`, [username, email, hashPassword, activationLink])).rows[0]
      const userDto = new UserDto(user)
      const tokens = tokenService.generateTokens({...userDto})
      await tokenService.saveToken(userDto.id, tokens.refreshToken)
      await mailService.sendActivationMail(email, `${process.env.SERVER_URL}:${process.env.PORT}/api/user/activate/${activationLink}`, username)

      return {...tokens, user: userDto}
    } catch (e) {
      throw new ApiError(500, 'Server error')
    }


  }

  async login(email, password) {
    const user = await pool.query(`select *
                                   from data.users
                                   where email = $1`, [email])
    if (user.rowCount <= 0) {
      throw ApiError.BadRequest('Пользователь не найден или не верный пароль')
    }
    const isPassEquals = await bcrypt.compare(password, user.rows[0].password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Пользователь не найден или не верный пароль')
    }
    try {
      const userDto = new UserDto(user.rows[0])
      const tokens = tokenService.generateTokens({...userDto})
      await tokenService.saveToken(userDto.id, tokens.refreshToken)
      return {...tokens, user: userDto}
    } catch (e) {
      throw new ApiError(500, 'Server error')
    }


  }

  async logout(refreshToken) {
    try {
      return await tokenService.removeToken(refreshToken)

    } catch (e) {
      throw new ApiError(500, 'Server error')
    }
  }

  async refresh(refreshToken) {
    const userData = tokenService.validateRefreshToken(refreshToken)
    if (!userData) {
      throw ApiError.UnauthorizedError('Токен умер')
    }
    try {
      const tokenDb = await tokenService.findToken(userData.id, refreshToken)
      if (!userData || !tokenDb) {
        return 'Error refresh'
      }
      const user = await pool.query(`select *
                                     from data.users
                                     where id = $1`, [userData.id])
      const userDto = new UserDto(user.rows[0])
      const tokens = tokenService.generateTokens({...userDto})
      await tokenService.saveToken(userDto.id, tokens.refreshToken)
      return {...tokens, user: userDto}
    } catch (e) {
      throw new ApiError(500, 'Server error')
    }


  }

  async activate(activationLink) {
    try {
      const user = (await pool.query(`select *
                                      from data.users
                                      where link = $1`, [activationLink])).rowCount
      if (user <= 0) {
        return false
      }
      await pool.query(`update data.users
                        set activated = $1
                        where link = $2`, [1, activationLink])
    } catch (e) {
      throw new ApiError(500, 'Server error')
    }
  }
}

export default new UserService()