import prisma from '../prismaClient.js'
import { getCipherFromText, getTextFromCipher } from '../jwt.js'
import {
  badCreateClient,
  badCreateFavorite,
  badDeactivateClient,
  badDeleteFavorite,
  badGetClient,
  badGetClients,
  badGetFavorite,
  badGetFavorites,
  badReactivateClient,
  badUpdateClient,
  badUpdateFavorite
} from '../errorCodes.js'

// Clients
const clientUncipher = (client) => {
  client.name = getTextFromCipher(client.name)
  client.email = getTextFromCipher(client.email)
  client.phone = getTextFromCipher(client.phone)
  return client
}
export const createClient = async (clientData) => {
  try {
    const { userId } = clientData
    const existingClient = await prisma.client.findFirst({
      where: { userId, email: getCipherFromText(clientData.email) },
      include: { favorites: true }
    })
    if (existingClient.id) return existingClient

    const name = getCipherFromText(clientData.name)
    const email = getCipherFromText(clientData.email)
    const phone = getCipherFromText(clientData.phone)
    const newClient = await prisma.client.create({ data: { name, email, phone, userId } })
    return clientUncipher(newClient)
  } catch (err) {
    throw badCreateClient
  }
}

export const getClients = async (userId) => {
  try {
    return (
      await prisma.client.findMany({
        where: { userId, status: 'active' },
        include: { favorites: true }
      })
    ).map((client) => clientUncipher(client))
  } catch (err) {
    throw badGetClients
  }
}

export const getInactiveClients = async (userId) => {
  try {
    return (
      await prisma.client.findMany({
        where: { userId, status: 'inactive' },
        include: { favorites: true }
      })
    ).map((client) => clientUncipher(client))
  } catch (err) {
    throw badGetClients
  }
}

export const getClient = async (clientId) => {
  try {
    return clientUncipher(
      await prisma.client.findUnique({
        where: { id: clientId },
        include: { favorites: true }
      })
    )
  } catch (err) {
    throw badGetClient
  }
}

export const updateClient = async (clientId, clientData) => {
  try {
    return clientUncipher(
      await prisma.client.update({
        where: { id: clientId },
        data: {
          name: getCipherFromText(clientData.name),
          email: getCipherFromText(clientData.email),
          phone: getCipherFromText(clientData.phone)
        },
        include: { favorites: true }
      })
    )
  } catch (err) {
    throw badUpdateClient
  }
}

export const deactivateClient = async (clientId) => {
  try {
    return clientUncipher(
      await prisma.client.update({
        where: { id: clientId },
        data: { status: 'inactive' },
        include: { favorites: true }
      })
    )
  } catch (err) {
    throw badDeactivateClient
  }
}

export const reactivateClient = async (clientId) => {
  try {
    return clientUncipher(
      await prisma.client.update({
        where: { id: clientId },
        data: { status: 'active' },
        include: { favorites: true }
      })
    )
  } catch (error) {
    throw badReactivateClient
  }
}

// Favorites

// model Favorite {
//   id       String   @id @unique @default(uuid())
//   clientId String
//   iId      String
//   pId      String?
//   iColorId String
//   pColorId String?
// }

export const createFavorite = async (favoriteData) => {
  try {
    return await prisma.favorite.create({ data: { ...favoriteData } })
  } catch (err) {
    throw badCreateFavorite
  }
}

export const getFavorites = async (clientId) => {
  try {
    return await prisma.favorite.findMany({ where: { clientId } })
  } catch (err) {
    throw badGetFavorites
  }
}
export const getFavorite = async (favoriteId) => {
  try {
    return await prisma.favorite.findFirst({ where: { id: favoriteId } })
  } catch (err) {
    throw badGetFavorite
  }
}

export const updateFavorite = async (favoriteId, favoriteData) => {
  try {
    return await prisma.favorite.update({
      where: { id: favoriteId },
      data: { ...favoriteData }
    })
  } catch (err) {
    throw badUpdateFavorite
  }
}

export const deleteFavorite = async (favoriteId) => {
  try {
    return await prisma.favorite.delete({ where: { id: favoriteId } })
  } catch (err) {
    throw badDeleteFavorite
  }
}
