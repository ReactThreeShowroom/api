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
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

export const checkType = (req, res, next) => {
  ;(req.query.type !== 'register' && req.query.type !== 'login') || req.query.type === undefined
    ? next(unknownType)
    : next()
}

export const getAction = (req, res, next) => {
  req.action = !req.user
    ? 'noAuth'
    : req.params.userId === req.user.id || (!req.params.userId && req.user)
    ? 'authOnlyOrSameUser'
    : req.user.id !== req.params.userId && req.user.admin === true
    ? 'adminAndNotSameUser'
    : 'default'
  next()
}

export const loginRegisterUser = async (req, res, next) => {
  try {
    console.log(req?.user)
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
    const { action } = req

    switch (action) {
      case 'noAuth': {
        res.status(401).send(notAuthorized)
        break
      }
      case 'authOnlyOrSameUser': {
        const user = await getUserById(req.user.id)
        res.status(200).send(user)
        break
      }
      case 'adminAndNotSameUser': {
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
