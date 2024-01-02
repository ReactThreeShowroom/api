import express from 'express'
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

userRouter.get('/', async (req, res, next) => {
  if (!req.user) throw { name: 'noUser', message: 'No User Given', status: 400 }
  try {
    if (!req.user.admin) throw { name: 'notAdmin', message: 'User Not Admin', status: 401 }
    // get all users if user is admin
    // skip and take queries for pagination - 10 per page default?
    // user (id, name, email, phone, admin, active, subs)
  } catch ({ name, message, status }) {
    next({ name, message, status })
  }
})
userRouter.get('/:userId', async (req, res, next) => {
  // get specific user (self or admin)
  // get request params
  // validate req.user is same user
  // only for updating user auth details
  // updateUser(id, {username, password})
  // retrieve revalidated user by id
  // send user (name, email, phone, admin, active, subs)
})
userRouter.put('/:userId', async (req, res, next) => {
  // update user details (self or admin)
  // get request params
  //   admin or user does auth check
  //   returned user from username / password must be admin or self
  //   used for buying subs, deletion, or updates
  // get request body (name, email, phone)
  // validate req.user is same user or admin
  // only for updating user auth details
  // updateUser(id, {name, email, phone})
  // retrieve revalidated user by id
  // send user same as GET
})

export default userRouter
