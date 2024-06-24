import prisma from '../prismaClient.js'
import { getCipherFromText, getTextFromCipher } from '../jwt.js'

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
      where: { userId, email: getCipherFromText(clientData.email) }
    })
    if (existingClient.id) return existingClient

    const name = getCipherFromText(clientData.name)
    const email = getCipherFromText(clientData.email)
    const phone = getCipherFromText(clientData.phone)
    const newClient = await prisma.client.create({ data: { name, email, phone, userId } })
    return clientUncipher(newClient)
  } catch (err) {
    throw {
      name: 'badCreateClient',
      message: 'Something went wrong creating Client. Please try again.',
      status: 400
    }
  }
}

export const getClients = async (userId) => {
  try {
    return (
      await prisma.client.findMany({
        where: { userId, status: 'active' }
      })
    ).map((client) => clientUncipher(client))
  } catch (err) {
    throw {
      name: 'badGetClients',
      message: 'Something went wrong getting Clients. Please try again.',
      status: 400
    }
  }
}

export const getInactiveClients = async (userId) => {
  try {
    return (
      await prisma.client.findMany({
        where: { userId, status: 'inactive' }
      })
    ).map((client) => clientUncipher(client))
  } catch (err) {
    throw {
      name: 'badGetClients',
      message: 'Something went wrong getting Clients. Please try again.',
      status: 400
    }
  }
}

export const getClient = async (clientId) => {
  try {
    return clientUncipher(await prisma.client.findUnique({ where: { id: clientId } }))
  } catch (err) {
    throw {
      name: 'badGetClient',
      message: 'Something went wrong getting Client. Please try again.',
      status: 400
    }
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
        }
      })
    )
  } catch (err) {
    throw {
      name: 'badUpdateClient',
      message: 'Something went wrong updating Client. Please try again.',
      status: 400
    }
  }
}

export const deactivateClient = async (clientId) => {
  try {
    return clientUncipher(
      await prisma.client.update({
        where: { id: clientId },
        data: { status: 'inactive' }
      })
    )
  } catch (err) {
    throw {
      name: 'badDeactivateClient',
      message: 'Something went wrong deactivating Client. Please try again.',
      status: 400
    }
  }
}

export const reactivateClient = async (clientId) => {
  try {
    return clientUncipher(
      await prisma.client.update({
        where: { id: clientId },
        data: { status: 'active' }
      })
    )
  } catch (error) {
    throw {
      name: 'badReactivateClient',
      message: 'Something went wrong reactivating Client. Please try again.',
      status: 400
    }
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
    const { clientId, iId, iColorId, pId, pColorId } = favoriteData
    return await prisma.favorite.create({ data: { ...favoriteData } })
  } catch (err) {
    throw {
      name: 'badCreateFavorite',
      message: 'Something went wrong creating Client Favorite. Please try again.',
      status: 400
    }
  }
}

export const getFavorites = async (clientId) => {
  try {
    return await prisma.favorite.findMany({ where: { clientId } })
  } catch (err) {
    throw {
      name: 'badGetFavorites',
      message: 'Something went wrong getting Client Favorites. Please try again.',
      status: 400
    }
  }
}
export const getFavorite = async (favoriteId) => {
  try {
    return await prisma.favorite.findFirst({ where: { id: favoriteId } })
  } catch (err) {
    throw {
      name: 'badGetFavorite',
      message: 'Something went wrong getting Client Favorite. Please try again.',
      status: 400
    }
  }
}

export const updateFavorite = async (favoriteId, favoriteData) => {
  try {
    return await prisma.favorite.update({
      where: { id: favoriteId },
      data: { ...favoriteData }
    })
  } catch (err) {
    throw {
      name: 'badUpdateFavorite',
      message: 'Something went wrong updating Client Favorite. Please try again.',
      status: 400
    }
  }
}

export const deleteFavorite = async (favoriteId) => {
  try {
    return await prisma.favorite.delete({ where: { id: favoriteId } })
  } catch (err) {
    throw {
      name: 'badCreateFavorite',
      message: 'Something went wrong creating Client Favorite. Please try again.',
      status: 400
    }
  }
}
