import express from 'express'
import prisma from '../prismaClient.js'
const userCredRouter = express.Router()
import { getCredIdFromToken, getTokenFromCredId } from '../jwt.js'
import { getUserByCred, createUser, getUserById, getCredByUserId } from '../db/user.js'

userCredRouter.post('/', async (req, res, next) => {
  const { type, userId } = req.query
  if (type === undefined)
    res.status(400).send({ name: 'noType', message: 'No Type Given for Check' })
  if (type === 'token') {
    try {
      const credId = await getCredIdFromToken(req.headers.authorization)
      const user = await getUserByCred(credId)
      res.status(200).send(user)
    } catch (err) {
      console.error(err)
      next(err)
    }
  }
  // login
  if (type === 'login') {
  }
  if (type === 'register') {
    const { password, username, email } = req.body
    try {
      const hPass = await bcrypt.hash(password, 10)
      const hName = await bcrypt.hash(username, 10)

      const createdUser = await createUser({ password: hPass, username: hName, email })

      const cred = await getCredByUserId(createdUser.id)
      const user = await getUserById(createdUser.id)

      const token = getTokenFromCredId(cred.id)
      if (token) res.status(201).send({ token, message: 'Thank You For Registering!', user })
    } catch (err) {
      console.error(err)
      next(err)
    }
  }
})
userCredRouter.get('/', async (req, res, next) => {})
userCredRouter.put('/:userCredId', async (req, res, next) => {})
userCredRouter.delete('/:userCredId', async (req, res, next) => {})

export default userCredRouter
