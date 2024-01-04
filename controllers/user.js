import { getIdFromToken, getTokenFromId } from '../jwt.js'
import { createUser, getUserById, getUserByIdAuth, verifyUser } from '../db/user.js'
import { notAuthorized, unknownError, cannotFindUser } from '../errorCodes.js'
import prisma from '../prismaClient.js'

export const userCheck = async (req, res, next) => {
  const auth = req.header('Authorization')
  if (!auth) {
    next()
    return
  }
  try {
    console.log(auth)
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

export const loginRegisterUser = async (req, res, next) => {
  const { type } = req.query
  if ((type !== 'register' && type !== 'login') || type === undefined)
    next({ name: 'unknownType', message: 'Unknown Type Given for Check', status: 400 })
  try {
    const isRegister = type === 'register'

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

    const exp = !req.user
      ? 'noAuth'
      : userId === req.user || (!userId && req.user)
      ? 'authOnlyOrSameUser'
      : req.user !== userId && req?.user.admin === true
      ? 'adminAndNotSameUser'
      : 'default'

    switch (exp) {
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
