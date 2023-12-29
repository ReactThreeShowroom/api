import express from 'express'
import prisma from '../prismaClient.js'
const userRouter = express.Router()

/**
 * User
 * id:         text
 * name:       text
 * email:      text
 * phone:      text
 * userCredId: text?
 *
 * UserCred
 * id:        text
 * username:  text
 * password:  text
 * googleSub: text?
 * userId:    text
 *
 */

userRouter.post('/', async (req, res, next) => {})
userRouter.get('/', async (req, res, next) => {
  if (!req.user) res.status(401).send({ name: 'noUser', message: 'No User Given' })
  try {
    if (!req.admin) res.status(401).send({ name: 'notAdmin', message: 'User Not Admin' })
    // get all users if user is admin
  } catch (err) {
    next(err)
  }
})
userRouter.get('/:userId', async (req, res, next) => {})
userRouter.put('/:userId', async (req, res, next) => {})
userRouter.delete('/:userId', async (req, res, next) => {})

export default userRouter
