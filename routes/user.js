import express from 'express'
import { noUser, notAdmin } from '../errorCodes.js'
import { getAllUsers, getUserByIdAuth, userCheck } from '../db/user.js'
import {} from '../controllers/user.js'
const userRouter = express.Router()

// model User {
//   id         String   @id @unique @default(uuid())
//   name       String
//   email      String
//   phone      String?
//   subs       Sub[]
//   username   String   @unique
//   password   String
//   googleSub  String?
//   active     Boolean  @default(true)
//   admin      Boolean  @default(false)
//   clientList Client[]
// }

userRouter.get('/admin', async (req, res, next) => {
  try {
    if (!req.local.user) throw noUser
    if (!req.local.user.admin) throw notAdmin
    const { s, t } = req.query
    const users = await getAllUsers(s, t)
    res.status(200).send(users)
  } catch (err) {
    next(err)
  }
})
userRouter.get('/me', async (req, res, next) => {
  try {
    const { user } = req.local
    if (!user) throw noUser
    res.status(200).send(user)
  } catch (err) {
    next(err)
  }
})
// userRouter.get('/admin/:userId', async (req, res, next) => {
//   if (!req.local?.user) throw noUser
//   if (!req.local?.user?.admin) throw notAdmin
//   // why is this necessary?
//   // get specific user (admin)
//   // get request params
//   // validate req.local.user is same user
//   // only for updating user auth details
//   // updateUser(id, {username, password})
//   // retrieve revalidated user by id
//   // send user (id, name, email, phone, admin, active, subs)
// })
userRouter.put('/admin/:userId', async (req, res, next) => {
  if (!req.local?.user) throw noUser
  if (!req.local?.user?.admin) throw notAdmin

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
  try {
    if (req.local.user.id !== req.params.userId)
      throw {
        name: 'notSameUser',
        message: 'You are not authorized to perform this action.',
        status: 401
      }
  } catch (err) {
    next(err)
  }
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
