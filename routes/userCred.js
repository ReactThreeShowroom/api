import express from 'express'
import prisma from '../prismaClient.js'
const userCredRouter = express.Router()
import { getIdFromToken } from '../jwt.js'
import { getUserByCred } from '../db/user.js'

userCredRouter.post('/', async (req, res, next) => {
  const { type, userId } = req.query
  if (type === undefined)
    res.status(400).send({ name: 'noType', message: 'No Type Given for Check' })
  if (type === 'login') {
    // login
    const credentialId = getIdFromToken(req.headers.authorization)
    const user = getUserByCred(credentialId)
  }
  if (type === 'register') {
    if (!userId) res.status(400).send({ name: 'NoUser', message: 'No User ID Given' })

    const { password, username } = req.body
    const hPass = await bcrypt.hash(password, 10)
    const hName = await bcrypt.hash(username, 10)
    const token = await createUserCred(hPass, hName, userId)
    if (token) res.status(201).send({ token })
    // register
    // hash password
    // hash username
    // create cred, receive token
    // if token, send on
  }
})
userCredRouter.get('/', async (req, res, next) => {})
userCredRouter.put('/:userCredId', async (req, res, next) => {})
userCredRouter.delete('/:userCredId', async (req, res, next) => {})

export default userCredRouter
