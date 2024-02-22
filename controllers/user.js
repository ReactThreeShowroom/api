import { getIdFromToken, getTokenFromId } from '../jwt.js'
import { createUser, getUserById, getUserByIdAuth, verifyUser } from '../db/user.js'
import { notAuthorized, unknownError, cannotFindUser, unknownType } from '../errorCodes.js'
import prisma from '../prismaClient.js'

export const userCheck = async (req, res, next) => {
  const auth = req.get('Authorization')
  if (!auth) {
    next()
    return
  }
  try {
    const id = getIdFromToken(auth)
    const user = await getUserByIdAuth(id)
    if (!user) {
      throw cannotFindUser
    }
    req.local = { user }
    // req.local.user = user
    next()
  } catch (err) {
    next(err)
  }
}

export const checkLoginRegister = (req, res, next) => {
  ;(req.query.type !== 'register' && req.query.type !== 'login') || req.query.type === undefined
    ? next(unknownType)
    : next()
}

export const getAuthType = (req, res, next) => {
  const isAdmin = req.local.user.admin === true
  const isSelf = req.params.userId === req.local.user.id

  console.log('getType', req.local.user, isAdmin, isSelf)

  req.local.authType = !req.local.user
    ? 'noAuth'
    : // : isSelf
    // ? 'Self'
    isSelf || (!req.params.userId && isAdmin)
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
    // console.log(req?.local.user)
    const isRegister = req.query.type === 'register'
    const id = isRegister ? await createUser(req.body) : await verifyUser(req.body)

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
    const { userId } = req.params
    const { authType, user: _user } = req.local

    console.log(userId, authType)

    switch (authType) {
      case 'noAuth': {
        res.status(401).send(notAuthorized)
        break
      }
      case 'adminOrSelf': {
        const user = await getUserById(_user.id)
        res.status(200).send(user)
        break
      }
      case 'adminAndNotSelf': {
        const user = await getUserById(userId)
        res.status(200).send(user)
        break
      }
      case 'notAdminAndNotSelf': {
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
