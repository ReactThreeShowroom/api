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

const userUncipher = (user) => {
  if (user.name) user.name = getTextFromCipher(user.name)
  if (user.email) user.email = getTextFromCipher(user.email)
  if (user.phone) user.phone = getTextFromCipher(user.phone)
  return user
}

export const createUser = async (userObj) => {
  try {
    const { password, email, username } = userObj

    if (!password || !username || !email) throw missingCredentials

    const name = getCipherFromText(userObj.name ? userObj.name : email.slice(0, email.indexOf('@')))
    const phone = getCipherFromText(userObj.phone ? userObj.phone : 'nothing')
    return userUncipher(
      await prisma.user.create({
        data: {
          name,
          email: getCipherFromText(email),
          username,
          password: await hashPass(password),
          phone
        }
      })
    )
  } catch (err) {
    if (err.code === 'P2002')
      throw {
        name: 'usernameAlreadyExists',
        status: 400,
        message: 'Username Already Exists'
      }
    else throw err
  }
}

export const getUserById = async (id) => {
  try {
    if (!id) throw noUserId

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        admin: true,
        active: true,
        subs: true
      }
    })

    if (!user) throw noUserFoundId

    return userUncipher(user)
  } catch (err) {
    throw err
  }
}

export const getUserByIdAuth = async (id) => {
  try {
    if (!id) throw noUserId

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phone: true,
        admin: true,
        active: true,
        subs: true
      }
    })

    if (!user) throw noUserFoundId

    return userUncipher(user)
  } catch (err) {
    throw err
  }
}

export const getUserByUsername = async (username) => {
  try {
    if (!username) throw noUsername
    console.log(username)

    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        subs: true
      }
    })

    if (!user) throw noUserFoundUsername

    return userUncipher(user)
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

    return user
  } catch (err) {
    throw err
  }
}

export const getAllUsers = async (skip = 0, take = 25) => {
  try {
    return (
      await prisma.user.findMany({
        skip,
        take,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          subs: true,
          active: true,
          admin: true
        }
      })
    ).map((user) => userUncipher(user))
  } catch (err) {
    throw err
  }
}

export const updateUser = async (userId, userObj) => {
  try {
    if (userObj.name) userObj.name = getCipherFromText(userObj.name)
    if (userObj.email) userObj.email = getCipherFromText(userObj.email)
    if (userObj.phone) userObj.phone = getCipherFromText(userObj.phone)
    if (userObj.username) userObj.username = userObj.username

    const user = await prisma.user.update({ where: { id: userId }, data: { ...userObj } })
    return userUncipher(await getUserByIdAuth(userId))
  } catch (err) {
    throw err
  }
}

export const deleteUser = async (userId) => {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { active: false }
    })
    return userUncipher(user)
  } catch (err) {
    throw err
  }
}
export const reactivateUser = async (userId) => {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { active: true }
    })
    return userUncipher(user)
  } catch (err) {
    throw err
  }
}

export const createSub = async (userId, type = 'year') => {
  try {
    return await prisma.sub.create({ data: { userId, status: 'pending', type } })
  } catch (err) {
    throw err
  }
}

export const getSubsByUserId = async (userId) => {
  try {
    return await prisma.sub.findMany({ where: { userId } })
  } catch (err) {
    throw err
  }
}

export const getSubById = async (subId) => {
  try {
    return await prisma.sub.findUnique({ where: { id: subId } })
  } catch (err) {
    throw err
  }
}

export const getSubsByStatus = async (status = 'pending') => {
  try {
    return prisma.sub.findMany({ where: { status } })
  } catch (err) {
    throw err
  }
}

const cancelSub = async (subId) => {
  try {
    return await prisma.sub.update({
      where: { id: subId },
      data: { status: 'cancelled' }
    })
  } catch (err) {
    throw {
      name: 'couldNotUpdateStatus',
      message: 'Could not update Subscription status. Please try again.',
      status: 500
    }
  }
}

const activateSub = async (subId) => {
  return await prisma.sub.update({
    where: { id: subId },
    data: { status: 'active' }
  })
}

const createSubDate = async (subId) => {
  const currentSub = await getSubById(subId)
  const now = Date()
  let length = 15778800000
  if (currentSub.type === 'one') length = 2629800000
  if (currentSub.type === 'six') length = 15778800000

  return await prisma.sub.update({
    where: { id: subId },
    data: {
      startDate: new Date(now).toISOString(),
      endDate: new Date(now + length).toISOString()
    }
  })
}

export const updateSub = async (subId, status, type) => {
  try {
    if (!subId)
      throw { name: 'noSubId', message: 'Subscription ID Invalid or Missing', status: 400 }
    if (!status)
      throw {
        name: 'wrongStatusType',
        message: 'Invalid status for Subscription Update',
        status: 500
      }
    switch (status) {
      case status === 'activate': {
        await activateSub(subId)
        await createSubDate(subId, type)
        break
      }
      case status === 'cancel': {
        await cancelSub(subId)
        break
      }
      case status === 'reactivate': {
        await activateSub(subId)
        break
      }
      default:
        throw {
          name: 'wrongStatusType',
          message: 'Invalid status for Subscription Update',
          status: 500
        }
    }
    return await getSubById(subId)
  } catch (err) {
    throw err
  }
}
