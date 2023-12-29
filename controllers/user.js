import jwt from '../jwt'
import { getAdminById, getUserById } from '../db/user'

export const userCheck = async (req, res, next) => {
  const prefix = 'Bearer '
  const auth = req.header('Authorization')

  if (!auth) {
    // nothing to see here
    next()
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length)

    try {
      const { id } = jwt.verify(token, JWT_SECRET)

      if (id) {
        req.user = await getUserById(id)
        if (req.user.adminId) req.admin = await getAdminById(req.user.adminId)
        next()
      } else {
        next({
          name: 'AuthorizationHeaderError',
          message: 'Authorization token malformed'
        })
      }
    } catch ({ name, message }) {
      next({ name, message })
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with '${prefix}'`
    })
  }
}
