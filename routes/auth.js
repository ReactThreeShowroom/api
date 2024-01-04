import express from 'express'
import { loginRegisterUser, getUserSelfAdmin } from '../controllers/user.js'
const authRouter = express.Router()

// login or register user
authRouter.post('/', loginRegisterUser)

// get user details (no creds) for self or admin use
// authRouter.get('/', getUserSelfAdmin)
authRouter.get('/:userId', getUserSelfAdmin)

// admin or user updates a user auth (username/password)
authRouter.put('/credentials/:userId', async (req, res, next) => {
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

// admin or user updates a user admin status (admin = true/false)
authRouter.put('/admin/:userId', async (req, res, next) => {
  //   admin does auth check
  //   returned user from username / password must be admin
  // get request params
  // get request body (password, username)
  // validate req.user is admin
  // only for updating user admin status
  // updateUserAdmin(id, admin)
  // retrieve revalidated user by id
  // send user
})

// admin or user updates a user subs
authRouter.put('/subs/:userId', async (req, res, next) => {
  //   admin does auth check
  //   returned user from username / password must be admin
  // get request params
  // validate req.user is admin
  // createUserSub(id)
  // retrieve revalidated user by id
  // send user
})

// admin or self deletes account
authRouter.delete('/:userId', async (req, res, next) => {
  //   admin or user does auth check
  //   returned user from username / password must be admin or self
  // get request params
  // validate req.user is same user or admin
  // deleteUser(id) - deactivate user, don't delete info
  // if deactiveated, cannot use showroom
})

export default authRouter
