import express from "express";
import UserController from "../controller/user.controller.js";
const router = express.Router()
import {body} from 'express-validator'
import userController from "../controller/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({min: 3, max: 35}),
  UserController.registration
)
router.get('/activate/:link', UserController.activate)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)

export default router
