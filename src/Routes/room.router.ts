import express from "express"
const router = express.Router()
import validateRoomJoi from '../user.Middleware.OAuth/joi'
import verifyToken  from '../user.Middleware.OAuth/jwt'
import hotelControllers from "../controller/hotel.controllers"
const { createRoomType, createARoom, fetchARoom, fetchRoomType, DeleteARoom, editRoom, fetchAllUser } = hotelControllers
import user from "../user.Middleware.OAuth/user"
const { signupUser, loginUser } = user


//signup/create user
router.post('/signup', signupUser)

//logIn user
router.post('/login', loginUser)

//to fetch all users
router.get('/users', verifyToken, fetchAllUser)

//room and roomtype functionalities
router.post('/room-types', verifyToken, createRoomType)
router.get('/room-types', fetchRoomType)
router.post('/rooms',validateRoomJoi, verifyToken,createARoom)
router.delete('/rooms/:id',verifyToken, DeleteARoom)
router.get('/rooms/:id', fetchARoom)
router.patch('/rooms/:id',validateRoomJoi, verifyToken, editRoom)

export default router