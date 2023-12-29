import prisma from '../prismaClient'
import jwt from '../jwt'

const { verify, sign } = jwt

export const getUserById = async (id) => {
  if (!id) throw new Error({ name: 'noUserId', message: 'No User ID Given' })
  try {
    const user = await prisma.user.findUnique({ where: { id }, include: { adminId: true } })
    if (!user) throw new Error({ name: 'noUserFound', message: 'No User Found With Given ID' })
    return user
  } catch (err) {
    console.error(err)
    return err
  }
}

export const getAdminById = async (id) => {
  if (id) {
    try {
      const admin = await prisma.admin.findUnique({ where: { id } })
      if (admin) return true
    } catch (err) {
      console.error(err)
      return err
    }
  }
  return false
}

export const getUserByCred = async (credId) => {
  // use credential id to find userId
  // getUserById(id)
  try {
    if (!credId) throw new Error({ name: 'noCredId', message: 'No Credential ID' })
    const { userId } = await prisma.userCred.findUnique({ where: { id: credId } })
    if (!userId) throw new Error({ name: 'noUserFound', message: 'No User Found With Given' })
    const user = await getUserById(userId)
    if (user.message) throw user
    return user
  } catch (error) {
    console.error(error)
    return err
  }
}

export const getAllUsers = async () => {}

export const updateUser = async () => {}

export const createUser = async () => {}

export const deleteUser = async () => {}
