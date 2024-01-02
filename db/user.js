import prisma from '../prismaClient'
import { hashPass, verifyPass, getCipherFromText, getTextFromCipher } from '../jwt'

export const createUser = async (userObj) => {
  const { password, email, username } = userObj

  if (!password || !username || !email) {
    throw {
      name: 'missingCredentials',
      message: 'Missing required credentials, please try again.',
      status: 400
    }
  }
  const name = getCipherFromText(userObj.name ? userObj.name : email.slice(0, email.indexOf('@')))
  const phone = getCipherFromText(userObj.phone ? userObj.phone : 'nothing')
  try {
    const { id } = await prisma.user.create({
      data: {
        name,
        email: getCipherFromText(email),
        username,
        password: await hashPass(password),
        phone
      }
    })
    return id
  } catch (err) {
    throw err
  }
}

export const getUserById = async (id) => {
  if (!id) throw { name: 'noUserId', message: 'No User ID Given', status: 400 }
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        email: true,
        phone: true,
        admin: true,
        active: true,
        subs: true
      }
    })
    if (!user) throw { name: 'noUserFound', message: 'No User Found With Given ID', status: 400 }
    user.name = getTextFromCipher(user.name)
    user.email = getTextFromCipher(user.email)
    user.phone = getTextFromCipher(user.phone)
    return user
  } catch (err) {
    throw err
  }
}

export const getUserByUsername = async (username) => {
  if (!username) throw { name: 'noUsername', message: 'No Username Given', status: 400 }
  try {
    const user = await prisma.user.findUnique({ where: { username } })
    if (!user)
      throw { name: 'noUserFound', message: 'No User Found With Given Username', status: 400 }
    user.name = getTextFromCipher(user.name)
    user.email = getTextFromCipher(user.email)
    user.phone = getTextFromCipher(user.phone)
    return user
  } catch (err) {
    throw err
  }
}

export const verifyUser = async ({ password, username }) => {
  try {
    if (!password || !username) throw {}
    const user = await getUserByUsername(username)
    const isCorrectPass = await verifyPass(password, user.password)
    if (!isCorrectPass) throw {}
    return user.id
  } catch (err) {
    throw err
  }
}

export const getAllUsers = async () => {
  // get all users with findMany()
  // paginate with skip # take #
  // decipher values after users come in
  // send deciphered users
}

export const updateUser = async () => {}

export const deleteUser = async () => {}
