import express from 'express'
import { noUser, notAdmin } from '../errorCodes.js'
const userRouter = express.Router()

/**
 *
 * User
 * id:        text
 * name:      text
 * email:     text
 * phone:     text
 * admin:     boolean
 * active:    boolean
 * username:  text
 * password:  text
 * googleSub: text?
 * subs:      Sub[]
 *
 */

userRouter.get('/admin', async (req, res, next) => {
  try {
    if (!req.local.user) throw noUser
    if (!req.local.user.admin) throw notAdmin
    res.status(200).send(req.local.user)
    // get all users if user is admin
    // skip and take queries for pagination - 10 per page default?
    // user (id, name, email, phone, admin, active, subs)
  } catch (err) {
    next(err)
  }
})
userRouter.get('/me', async (req, res, next) => {
  try {
    if (!req.local.user) throw noUser
    res.status(200).send(req.local.user)
    // get your own user data if you're the user
    // user (id, name, email, phone, admin, active, subs)
  } catch (err) {
    next(err)
  }
})
userRouter.get('/admin/:userId', async (req, res, next) => {
  // get specific user (admin)
  // get request params
  // validate req.local.user is same user
  // only for updating user auth details
  // updateUser(id, {username, password})
  // retrieve revalidated user by id
  // send user (id, name, email, phone, admin, active, subs)
})
userRouter.put('/admin/:userId', async (req, res, next) => {
  // update user details (self or admin)
  // get request params
  //   admin or user does auth check
  //   returned user from username / password must be admin or self
  //   used for buying subs, deletion, or updates
  // get request body (name, email, phone)
  // validate req.local.user is same user or admin
  // only for updating user auth details
  // updateUser(id, {name, email, phone})
  // retrieve revalidated user by id
  // send user same as GET
})
userRouter.put('/update/:userId', async (req, res, next) => {
  // update user details (self or admin)
  // get request params
  //   admin or user does auth check
  //   returned user from username / password must be admin or self
  //   used for buying subs, deletion, or updates
  // get request body (name, email, phone)
  // validate req.local.user is same user or admin
  // only for updating user auth details
  // updateUser(id, {name, email, phone})
  // retrieve revalidated user by id
  // send user same as GET
})

userRouter.delete('/delete/:userId', async (req, res, next) => {
  // delete user - make inactive
  // user-requested
})

export default userRouter
