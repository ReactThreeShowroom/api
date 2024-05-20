import express from 'express'
import {
  loginRegisterUser,
  getUserSelfAdmin,
  checkLoginRegister,
  getAuthType
} from '../controllers/user.js'
const authRouter = express.Router()

import { notAuthorized } from '../errorCodes.js'

// login or register user
authRouter.post('/', checkLoginRegister, loginRegisterUser)

// get user details (no creds) for self or admin use
// authRouter.get('/', getUserSelfAdmin)
authRouter.get('/admin/:userId', getAuthType, getUserSelfAdmin)

// admin updates a user admin status (admin = true/false)
authRouter.patch('/admin/:userId', getAuthType, async (req, res, next) => {
  //   admin does auth check
  //   returned user from username / password must be admin
  // get request params
  // get request body (password, username)
  // validate req.local.user is admin
  // only for updating user admin status
  // updateUserAdmin(id, admin)
  // retrieve revalidated user by id
  // send user

  try {
    const { userId } = req.params
    const { authType } = req
    const isAuth = new Set(['adminAndNotSelf', 'adminAndSelf']).has(authType)

    if (!isAuth) throw notAuthorized
  } catch (error) {
    next(error)
  }
})

// admin deletes account
authRouter.delete('/admin/:userId', getAuthType, async (req, res, next) => {
  //   admin initiated delete
  //   admin does auth check
  //   returned user from username / password must be admin or self
  // get request params
  // validate req.local.user is same user or admin
  // deleteUser(id) - deactivate user, don't delete info
  // if deactiveated, cannot use showroom

  try {
    const { userId } = req.params
    const { authType } = req
    const isAuth = new Set(['adminAndNotSelf']).has(authType)

    if (!isAuth) throw notAuthorized
  } catch (error) {
    next(error)
  }
})

// User updates a user auth (username/password)
authRouter.patch('/credentials/:userId', getAuthType, async (req, res, next) => {
  //   admin does auth check
  //   returned user from username / password must be admin or self
  // get request params
  // get request body (password, username)
  // validate req.local.user is admin
  // only for updating user auth details
  // updateUserAuth(id, {username, password})
  // retrieve revalidated user by id
  // send user

  try {
    const { userId } = req.params
    const { authType } = req
    const isAuth = new Set(['adminAndNotSelf', 'adminAndSelf']).has(authType)

    if (!isAuth) throw notAuthorized
  } catch (error) {
    next(error)
  }
})

// admin updates a user subs
authRouter.post('/subs/:userId', getAuthType, async (req, res, next) => {
  //   admin does auth check
  //   returned user from username / password must be admin
  // get request params
  // validate req.local.user is admin
  // createUserSub(id)
  // retrieve revalidated user by id
  // send user

  try {
    const { userId } = req.params
    const { authType } = req
    const isAuth = new Set(['adminAndNotSelf', 'adminAndSelf']).has(authType)

    if (!isAuth) throw notAuthorized
  } catch (error) {
    next(error)
  }
})

// admin gets list of pending subscriptions
authRouter.get('/pending-subs', getAuthType, async (req, res, next) => {
  try {
    const { authType } = req
    const isAuth = new Set(['adminAndNotSelf', 'adminAndSelf']).has(authType)

    if (!isAuth) throw notAuthorized
  } catch (error) {
    next(error)
  }
})

// admin updates pending subscription
authRouter.patch('/pending-subs/:subId', getAuthType, async (req, res, next) => {
  try {
    const { subsId } = req.params
    const { authType } = req
    const isAuth = new Set(['adminAndNotSelf', 'adminAndSelf']).has(authType)

    if (!isAuth) throw notAuthorized
  } catch (error) {
    next(error)
  }
})

export default authRouter
