import express from 'express'
import {
  loginRegisterUser,
  getUserSelfAdmin,
  checkLoginRegister,
  updateUserById,
  adminDeleteUser,
  adminGetsAllSubs,
  userUpdatesCredentials,
  adminUpdatesSub,
  adminPendingSubs,
  getAuthType
} from '../controllers/user.js'
const authRouter = express.Router()

// login or register user
authRouter.post('/', checkLoginRegister, loginRegisterUser)

// get user details (no creds) for self or admin use
// authRouter.get('/', getUserSelfAdmin)
authRouter.get('/admin/:userId', getAuthType, getUserSelfAdmin)

// admin updates a user admin status (admin = true/false)
// or other details as needed
authRouter.patch('/admin/:userId', getAuthType, updateUserById)

// admin deletes account
authRouter.delete('/admin/:userId', getAuthType, adminDeleteUser)

// User updates a user auth (username/password)
authRouter.patch('/credentials/:userId', getAuthType, userUpdatesCredentials)

// admin gets all subs by user
authRouter.get('/subs/user/:userId', getAuthType, adminGetsAllSubs)

// admin updates a user subs
authRouter.patch('/subs/:subId', getAuthType, adminUpdatesSub)

// admin gets list of pending subscriptions
authRouter.get('/pending-subs', getAuthType, adminPendingSubs)

export default authRouter
