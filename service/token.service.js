import jwt from 'jsonwebtoken'
import pool from '../db.js'
import ApiError from "../exceptions/api.error.js";

class TokenService {
  generateTokens(payload) {
    try {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {expiresIn: '30m'})
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {expiresIn: '30d'})
      return {
        accessToken,
        refreshToken
      }
    } catch (e) {
      throw new ApiError(500, 'Server error')
    }

  }
  async saveToken(userID, refreshToken) {
    try {
      const candidate = (await pool.query(`select * from data.token where userid = ${userID}`)).rowCount
      if (candidate > 0) {
        await pool.query(`UPDATE data.token SET refreshtoken = '${refreshToken}' where userid = ${userID}`)
        return true
      }
      await pool.query(`insert into data.token (userid, refreshtoken) values ($1,$2)`, [userID, refreshToken])
      return true
    } catch (e) {
      return false
    }
  }

  async removeToken(refreshToken) {
    try {
      return await pool.query(`delete
                               from data.token
                               where refreshtoken = $1`, [refreshToken])

    } catch (e) {
      throw new ApiError(500, 'Server error')
    }
  }

  async findToken(userID, token) {
    try {
      return (await pool.query(`select *
                                from data.token
                                where userid = $1`, [userID])).rows[0].refreshtoken === token

    } catch (e) {
      throw new ApiError(500, 'Server error')
    }
  }
  
  validateAccessToken(token){
    try {
      return jwt.verify(token, process.env.JWT_ACCESS)
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token){
    try {
      return jwt.verify(token, process.env.JWT_REFRESH)
    } catch (e) {
      return null
    }
  }

}

export default new TokenService()