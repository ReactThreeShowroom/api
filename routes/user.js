import express from 'express'
import {
  adminCheck,
  contUserAdminGet,
  contUserAdminGetOne,
  contUserDelete,
  contUserMe,
  contUserUpdate,
  selfCheck
} from '../controllers/user.js'
const userRouter = express.Router()

userRouter.get('/admin', adminCheck, contUserAdminGet)
userRouter.get('/admin/:userId', adminCheck, contUserAdminGetOne)
userRouter.get('/me', contUserMe)
userRouter.put('/update/:userId', selfCheck, contUserUpdate)
userRouter.delete('/delete/:userId', selfCheck, contUserDelete)

export default userRouter
