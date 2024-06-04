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
    console.log(username)

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
          subs: true,
          active: true,
          admin: true
        }
      })
    ).map((user) => {
      user.name = getTextFromCipher(user.name)
      user.email = getTextFromCipher(user.email)
      return user
    })
  } catch (err) {
    throw err
  }
}

export const updateUser = async (userId, userObj) => {
  try {
    if (userObj.name) userObj.name = getCipherFromText(userObj.name)
    if (userObj.email) userObj.email = getCipherFromText(userObj.email)
    if (userObj.phone) userObj.phone = getCipherFromText(userObj.phone)

    const user = await prisma.user.update({ where: { id: userId }, data: { ...userObj } })

    if (user.name) user.name = getTextFromCipher(user.name)
    if (user.email) user.email = getTextFromCipher(user.email)
    if (user.phone) user.phone = getTextFromCipher(user.phone)

    return user
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
    user.name = getTextFromCipher(user.name)
    user.email = getTextFromCipher(user.email)
    return user
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
    user.name = getTextFromCipher(user.name)
    user.email = getTextFromCipher(user.email)
    return user
  } catch (err) {
    throw err
  }
}

export const createSub = async (userId) => {
  try {
    return await prisma.sub.create({ data: { userId, status: 'pending' } })
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

export const getSubsByStatus = async (status = 'pending') => {
  try {
    return prisma.sub.findMany({ where: { status } })
  } catch (err) {
    throw err
  }
}

export const updateSub = async (subId, status, type) => {
  try {
    if (!subId)
      throw { name: 'No Sub Id', message: 'Subscription ID Invalid or Missing', status: 400 }
    let sub = null
    switch (status) {
      case status === 'active': {
        const now = Date()
        let length = 0
        switch (type) {
          case type === 'one':
            length = 2629800000
            break
          case type === 'six':
            length = 15778800000
            break
          case type === 'year':
            length = 31557600000
            break
          default:
            length = 15778800000
        }
        sub = await prisma.sub.update({
          where: { id: subId },
          data: {
            status,
            startDate: new Date(now).toISOString(),
            endDate: new Date(now + length).toISOString()
          }
        })
        break
      }
      case status === 'cancelled': {
        sub = await prisma.sub.update({
          where: { id: subId },
          data: { status }
        })
        break
      }
      case status === 'reactivate': {
        sub = await prisma.sub.update({
          where: { id: subId },
          data: { status: 'active' }
        })
        break
      }
      default:
        throw {
          name: 'wrongStatusType',
          message: 'Invalid status for Subscription Update',
          status: 500
        }
    }
    return sub
  } catch (err) {
    throw err
  }
}
