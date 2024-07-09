import { getIdFromToken, getTokenFromId } from '../jwt.js'
import {
  createUser,
  getUserById,
  getUserByIdAuth,
  verifyUser,
  getSubsByStatus,
  getSubsByUserId,
  updateSub,
  updateUser,
  createSub
} from '../db/user.js'
import {
  notAuthorized,
  unknownError,
  cannotFindUser,
  unknownType,
  failedLoginRegister
} from '../errorCodes.js'

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

export const noUserCheck = async (req, res, next) => {
  try {
    if (!req.local.user) throw noUser
    next()
  } catch (err) {
    next(err)
  }
}
export const selfCheck = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { user } = req.local
    if (user.id !== userId) throw notSameUser
    next()
  } catch (err) {
    next(err)
  }
}
export const adminCheck = async (req, res, next) => {
  try {
    if (!req.local.user.admin) throw notAdmin
    next()
  } catch (err) {
    next(err)
  }
}

export const checkLoginRegister = (req, res, next) => {
  const { type } = req.query
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
    const { id } = isRegister ? await createUser(body) : await verifyUser(body)
    const token = getTokenFromId(id)
    const user = await getUserById(id)

    if (token && user) {
      const status = isRegister ? 201 : 200
      const message = isRegister ? 'Thank you for registering!' : 'Successfully logged in!'
      res.status(status).send({ token, message, user })
      return
    }

    res.status(400).send(failedLoginRegister)
  } catch (err) {
    next(err)
  }
}

export const getUserSelfAdmin = async (req, res, next) => {
  try {
    const {
      params: { userId },
      local: {
        authType,
        user: { id }
      }
    } = req
    switch (authType) {
      case 'noAuth':
      case 'notAdminAndNotSelf': {
        res.status(401).send(notAuthorized)
        break
      }
      case 'adminOrSelf':
      case 'adminAndNotSelf':
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
    const {
      local: { authType },
      params: { userId },
      body: { updates }
    } = req

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
    const {
      local: { authType },
      params: { userId }
    } = req

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
    const {
      local: { authType },
      params: { userId },
      body: { updates }
    } = req

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
    const {
      local: { authType },
      params: { userId }
    } = req

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
    const {
      local: { authType },
      query: { status, type },
      params: { subId }
    } = req
    const isAuth = new Set(['adminAndNotSelf', 'adminOrSelf', 'adminAndSelf']).has(authType)
    if (!isAuth) throw notAuthorized

    const sub = await updateSub(subId, status, type)
    console.log(sub)
    res.status(200).send(sub)
  } catch (error) {
    next(error)
  }
}

export const adminPendingSubs = async (req, res, next) => {
  try {
    const {
      local: { authType }
    } = req
    const isAuth = new Set(['adminAndNotSelf', 'adminOrSelf']).has(authType)
    if (!isAuth) throw notAuthorized

    const sub = await getSubsByStatus()
    res.status(200).send(sub)
  } catch (error) {
    next(error)
  }
}

export const contUserAdminGet = async (req, res, next) => {
  // /user/admin?s=xx&t=yy
  // s & t are strings from url
  try {
    const { s, t } = req.query
    const [skip, take] = [Number(s), Number(t)]
    const users = await getAllUsers(skip, take)
    res.status(200).send(users)
  } catch (err) {
    next(err)
  }
}

export const contUserAdminGetOne = async (req, res, next) => {
  try {
    const {
      params: { userId },
      body: { updates }
    } = req
    await updateUser(userId, updates)
    const user = await getUserByIdAuth(userId)
    res.status(204).send(user)
  } catch (err) {
    next(err)
  }
}

export const contUserMe = async (req, res, next) => {
  try {
    // send user received by token
    const { user } = req.local
    res.status(200).send(user)
  } catch (err) {
    next(err)
  }
}

export const contUserUpdate = async (req, res, next) => {
  try {
    const {
      params: { userId },
      body: { updates }
    } = req
    await updateUser(userId, updates)
    const user = await getUserByIdAuth(userId)
    res.status(204).send(user)
  } catch (err) {
    next(err)
  }
}

export const contUserDelete = async (req, res, next) => {
  try {
    const { userId } = req.params
    const user = await deleteUser(userId)
    res.status(204).send(user)
  } catch (err) {
    next(err)
  }
}

export const contUserCreateSub = async (req, res, next) => {
  try {
    const {
      params: { userId },
      body: { type }
    } = req
    const newSub = await createSub(userId, type)
    if (!newSub)
      throw {
        name: 'badCreateSub',
        message: 'Could not create Subscription. Please try again.',
        status: 400
      }
    const newUser = await getUserByIdAuth(userId)
    res.status(201).send(newUser)
  } catch (err) {
    next(err)
  }
}
