import express from 'express'
const authRouter = express.Router()
import { getTokenFromId } from '../jwt.js'
import { createUser, getUserById, verifyUser } from '../db/user.js'

authRouter.post('/', async (req, res, next) => {
  const { type } = req.query
  if ((type !== 'register' && type !== 'login') || type === undefined)
    next({ name: 'unknownType', message: 'Unknown Type Given for Check', status: 400 })
  try {
    const isRegister = type === 'register'

    const id = isRegister ? await createUser(req.body) : await verifyUser(req.body)

    const token = getTokenFromId(id)
    const user = await getUserById(id)

    let status, message
    if (token && user) {
      status = isRegister ? 201 : 200
      isRegister ? 'Thank you for registering!' : 'Successfully logged in!'
      res.status(status).send({ token, message, user })
    }

    res.status(400).send({
      name: 'failedLoginRegister',
      message: 'Unsuccessful login or register, please try again!'
    })
  } catch ({ name, message, status }) {
    next({ name, message, status })
  }
})
authRouter.get('/', async (req, res, next) => {
  // admin or self gets user
  try {
    if (req.user) res.status(200).send(await getUserById(req.user.id))
  } catch ({ name, message, status }) {
    next({ name, message, status })
  }
})

authRouter.put('/credentials/:userId', async (req, res, next) => {
  // admin or user updates a user auth
  //   admin or user does auth check
  //   returned user from username / password must be admin or self
  // get request params
  // get request body (password, username)
  // validate req.user is admin
  // only for updating user auth details
  // updateUserAuth(id, {username, password})
  // retrieve revalidated user by id
  // send user
})

authRouter.put('/admin/:userId', async (req, res, next) => {
  // admin or user updates a user auth
  //   admin does auth check
  //   returned user from username / password must be admin
  // get request params
  // get request body (password, username)
  // validate req.user is admin
  // only for updating user auth details
  // updateUserAdmin(id, admin)
  // retrieve revalidated user by id
  // send user
})

authRouter.put('/subs/:userId', async (req, res, next) => {
  // admin or user updates a user auth
  // get request params
  // validate req.user is admin
  // createUserSub(id)
  // retrieve revalidated user by id
  // send user
})

authRouter.delete('/:userId', async (req, res, next) => {
  // admin or self deletes self account.
  //   admin or user does auth check
  //   returned user from username / password must be admin or self
  // get request params
  // validate req.user is same user or admin
  // deleteUser(id) - deactivate user, don't delete info
  // if deactiveated, cannot use showroom
})

export default authRouter
