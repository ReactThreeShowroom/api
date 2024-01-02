import jwt, { getIdFromToken } from '../jwt'
import { getCredByUserId, getUserById } from '../db/user'
import prisma from '../prismaClient'

export const userCheck = async (req, res, next) => {
  const auth = req.header('Authorization')

  if (!auth) next()
  try {
    const id = getIdFromToken(auth)
    const user = await prisma.user.findUnique({ where: { id }, include: { subs: true } })
    if (!user)
      throw { name: 'cannotFindUser', message: 'Cannot validate User Token or Id', status: 400 }
    req.user = user
    next()
  } catch ({ name, message, status }) {
    next({ name, message, status })
  }
}
