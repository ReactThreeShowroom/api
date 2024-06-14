import { getIdFromToken, getTokenFromId } from '../jwt.js'
import {
  createUser,
  getUserById,
  getUserByIdAuth,
  verifyUser,
  getSubsByStatus,
  getSubsByUserId,
  updateSub,
  updateUser
} from '../db/user.js'
import { notAuthorized, unknownError, cannotFindUser, unknownType } from '../errorCodes.js'

export const userCheck = async (req, res, next) => {
  try {
    const auth = req.get('Authorization')
    if (!auth) {
      next()
      return
    }
    const id = getIdFromToken(auth)
    const user = await getUserByIdAuth(id)
    if (!user) {
      throw cannotFindUser
    }
    req.local = { user }
    next()
  } catch (err) {
    next(err)
  }
}

export const checkLoginRegister = (req, res, next) => {
  const { type } = req.query
  console.log(type)
  const isReg = type === 'register'
  const isLog = type === 'login'
  const isUnknown = type === undefined
  ;(!isReg && !isLog) || isUnknown ? next(unknownType) : next()
}

export const getAuthType = (req, res, next) => {
  const { user } = req.local
  const { userId } = req.params
  const isAdmin = user.admin === true
  const isSelf = userId === user.id

  req.local.authType = !user
    ? 'noAuth'
    : isSelf || (!userId && isAdmin)
    ? 'adminOrSelf'
    : !isSelf && isAdmin
    ? 'adminAndNotSelf'
    : !isSelf && !isAdmin
    ? 'notAdminAndNotSelf'
    : isSelf && isAdmin
    ? 'adminAndSelf'
    : 'default'
  next()
}

export const loginRegisterUser = async (req, res, next) => {
  try {
    const {
      query: { type },
      body
    } = req
    const isRegister = type === 'register'
    const id = isRegister ? await createUser(body) : await verifyUser(body)

    const token = getTokenFromId(id)
    const user = await getUserById(id)

    if (token && user) {
      const status = isRegister ? 201 : 200
      const message = isRegister ? 'Thank you for registering!' : 'Successfully logged in!'
      res.status(status).send({ token, message, user })
      return
    }

    res.status(400).send({
      name: 'failedLoginRegister',
      message: 'Unsuccessful login or register, please try again!'
    })
  } catch (err) {
    next(err)
  }
}

export const getUserSelfAdmin = async (req, res, next) => {
  try {
    const {
      params: userId,
      local: {
        authType,
        user: { id }
      }
    } = req

    switch (authType) {
      case 'noAuth': {
        res.status(401).send(notAuthorized)
        break
      }
      case 'adminOrSelf': {
        const user = await getUserById(id)
        res.status(200).send(user)
        break
      }
      case 'adminAndNotSelf': {
        const user = await getUserById(userId)
        res.status(200).send(user)
        break
      }
      case 'notAdminAndNotSelf': {
        // make and send error later
        res.sendStatus(401)
        break
      }
      case 'adminAndSelf': {
        const user = await getUserById(userId)
        res.status(200).send(user)
        break
      }
      default:
        res.status(400).send(unknownError)
    }
  } catch (err) {
    next(err)
  }
}

export const updateUserById = async (req, res, next) => {
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
}

export const adminDeleteUser = async (req, res, next) => {
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
}

export const userUpdatesCredentials = async (req, res, next) => {
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
}

export const adminGetsAllSubs = async (req, res, next) => {
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
}

export const adminUpdatesSub = async (req, res, next) => {
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
}

export const adminPendingSubs = async (req, res, next) => {
  try {
    const { authType } = req
    const isAuth = new Set(['adminAndNotSelf']).has(authType)
    if (!isAuth) throw notAuthorized

    const sub = await getSubsByStatus()
    res.status(200).send(sub)
  } catch (error) {
    next(error)
  }
}
