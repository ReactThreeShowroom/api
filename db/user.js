import prisma from '../prismaClient'

export const createUser = async ({ email, username, password }) => {
  // create user, and create credential at once.
  const name = email.slice(0, email.indexOf('@'))
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        userCred: {
          create: {
            username,
            password
          }
        }
      }
    })
    if (!user) throw new Error({ name: 'cannotCreateUser', message: 'Could Not Create User' })
    return user
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getUserById = async (id) => {
  if (!id) throw new Error({ name: 'noUserId', message: 'No User ID Given' })
  try {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) throw new Error({ name: 'noUserFound', message: 'No User Found With Given ID' })
    return user
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getUserByCred = async (userCredId) => {
  // use credential id to find userId
  // getUserById(id)
  if (!credId) throw new Error({ name: 'noCredId', message: 'No Credential ID' })
  try {
    const { user } = await prisma.user.findUnique({ where: { userCredId } })
    if (!user) throw new Error({ name: 'noUserFound', message: 'No User Found With Given ID' })
    return user
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getCredByUserId = async (userId) => {
  try {
    const cred = await prisma.userCred.findUnique({ where: { userId } })
    return cred
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getAllUsers = async () => {}

export const updateUser = async () => {}

export const deleteUser = async () => {}
