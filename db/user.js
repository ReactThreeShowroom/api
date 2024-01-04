import prisma from '../prismaClient.js'
import { hashPass, verifyPass, getCipherFromText, getTextFromCipher } from '../jwt.js'
import {
  noUserFoundId,
  noUserFoundUsername,
  noUserId,
  noUsername,
  missingCredentials,
  wrongCredentials
} from '../errorCodes.js'

export const createUser = async (userObj) => {
  try {
    const { password, email, username } = userObj

    if (!password || !username || !email) throw missingCredentials

    const name = getCipherFromText(userObj.name ? userObj.name : email.slice(0, email.indexOf('@')))
    const phone = getCipherFromText(userObj.phone ? userObj.phone : 'nothing')

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
  try {
    if (!id) throw noUserId

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

    if (!user) throw noUserFoundId

    user.name = getTextFromCipher(user.name)
    user.email = getTextFromCipher(user.email)
    user.phone = getTextFromCipher(user.phone)
    return user
  } catch (err) {
    throw err
  }
}

export const getUserByIdAuth = async (id) => {
  try {
    if (!id) throw noUserId

    const user = await prisma.user.findUnique({ where: { id }, include: { subs: true } })

    if (!user) throw noUserFoundId

    user.name = getTextFromCipher(user.name)
    user.email = getTextFromCipher(user.email)
    user.phone = getTextFromCipher(user.phone)
    return user
  } catch (err) {
    throw err
  }
}

export const getUserByUsername = async (username) => {
  try {
    if (!username) throw noUsername

    const user = await prisma.user.findUnique({ where: { username } })

    if (!user) throw noUserFoundUsername

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
    if (!password || !username) throw missingCredentials

    const user = await getUserByUsername(username)
    const isCorrectPass = await verifyPass(password, user.password)

    if (!isCorrectPass) throw wrongCredentials

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
