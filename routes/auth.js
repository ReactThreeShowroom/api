import express from 'express'
import {
  loginRegisterUser,
  getUserSelfAdmin,
  checkLoginRegister,
  getAuthType
} from '../controllers/user.js'
const authRouter = express.Router()

import { notAuthorized } from '../errorCodes.js'
import { getSubsByStatus, getSubsByUserId, getUserById, updateSub, updateUser } from '../db/user.js'

// login or register user
authRouter.post('/', checkLoginRegister, loginRegisterUser)

// get user details (no creds) for self or admin use
// authRouter.get('/', getUserSelfAdmin)
authRouter.get('/admin/:userId', getAuthType, getUserSelfAdmin)

// admin updates a user admin status (admin = true/false)
// or other details as needed
authRouter.patch('/admin/:userId', getAuthType, async (req, res, next) => {
  try {
    const { userId } = req.params
    const { updates } = req.body
    const { authType } = req

    const isAuth = new Set(['adminAndNotSelf']).has(authType)
    if (!isAuth) throw notAuthorized

    await updateUser(userId, updates)
    const user = await getUserById(userId)

    res.status(204).send(user)
  } catch (error) {
    next(error)
  }
})

// admin deletes account
authRouter.delete('/admin/:userId', getAuthType, async (req, res, next) => {
  try {
    const { userId } = req.params
    const { authType } = req

    const isAuth = new Set(['adminAndNotSelf']).has(authType)
    if (!isAuth) throw notAuthorized

    await deleteUser(userId)
    const user = await getUserById(userId)

    res.status(204).send(user)
  } catch (error) {
    next(error)
  }
})

// User updates a user auth (username/password)
authRouter.patch('/credentials/:userId', getAuthType, async (req, res, next) => {
  try {
    const { userId } = req.params
    const { updates } = req.body
    const { authType } = req

    const isAuth = new Set(['adminAndNotSelf', 'adminAndSelf', 'adminOrSelf']).has(authType)
    if (!isAuth) throw notAuthorized

    if (updates.admin) delete updates.admin

    await updateUser(userId, updates)
    const user = await getUserById(userId)

    res.status(204).send(user)
  } catch (error) {
    next(error)
  }
})

// admin gets all subs by user

authRouter.get('/subs/user/:userId', getAuthType, async (req, res, next) => {
  try {
    const { userId } = req.params
    const { authType } = req

    const isAuth = new Set(['adminAndNotSelf', 'adminAndSelf']).has(authType)
    if (!isAuth) throw notAuthorized

    const subs = await getSubsByUserId(userId)
    res.status(200).send(subs)
  } catch (error) {
    next(error)
  }
})

// admin updates a user subs
authRouter.patch('/subs/:subId', getAuthType, async (req, res, next) => {
  try {
    const { subId } = req.params
    const { status, type } = req.query
    const { authType } = req

    const isAuth = new Set(['adminAndNotSelf']).has(authType)
    if (!isAuth) throw notAuthorized

    const sub = await updateSub(subId, status, type)
    res.status(204).send(sub)
  } catch (error) {
    next(error)
  }
})

// admin gets list of pending subscriptions
authRouter.get('/pending-subs', getAuthType, async (req, res, next) => {
  try {
    const { authType } = req
    const isAuth = new Set(['adminAndNotSelf']).has(authType)
    if (!isAuth) throw notAuthorized

    const sub = await getSubsByStatus()
    res.status(200).send(sub)
  } catch (error) {
    next(error)
  }
})

export default authRouter
