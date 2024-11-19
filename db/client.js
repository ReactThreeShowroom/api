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
import { getModels } from './favorite.js'

// Clients

// model Client {
//   id        String     @id @unique @default(uuid())
//   name      String
//   email     String
//   phone     String
//   status    String     @default("active")
//   favorites Favorite[]
//   userId    String
//   User      User       @relation(fields: [userId], references: [id])
// }

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
    // console.log(existingClient)
    if (existingClient) return existingClient

    const name = getCipherFromText(clientData.name)
    const email = getCipherFromText(clientData.email)
    const phone = getCipherFromText(clientData.phone)
    const newClient = await prisma.client.create({
      data: { name, email, phone, userId, status: 'active' }
    })
    // console.log(newClient)
    return clientUncipher(newClient)
  } catch (err) {
    console.error(err)
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
    console.log(err)
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
          phone: getCipherFromText(clientData.phone),
          status: clientData.status
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
//   id              String            @id @unique @default(uuid())
//   client          Client            @relation(fields: [clientId], references: [id], onDelete: Cascade)
//   Model           Model             @relation(fields: [modelId], references: [id], onDelete: Cascade)
//   clientId        String
//   modelId         String
//   patternId       String?
//   PieceFavorite   PieceFavorite[]
//   PatternFavorite PatternFavorite[]
// }

export const createFavorite = async (favoriteData) => {
  try {
    const models = await getModels()
    favoriteData.modelId ??= models[0].id
    return await prisma.favorite.create({
      data: { ...favoriteData },
      include: {
        model: true,
        pieceFavorite: { include: { piece: true, color: true } },
        patternFavorite: { include: { pattern: true, color: true } }
      }
    })
  } catch (err) {
    console.log(err)
    throw badCreateFavorite
  }
}

export const getFavorites = async (clientId) => {
  try {
    return await prisma.favorite.findMany({
      where: { clientId },
      include: {
        model: true,
        pieceFavorite: { include: { piece: true, color: true } },
        patternFavorite: { include: { pattern: true, color: true } }
      }
    })
  } catch (err) {
    throw badGetFavorites
  }
}
export const getFavorite = async (favoriteId) => {
  try {
    return await prisma.favorite.findFirst({
      where: { id: favoriteId },
      include: {
        model: true,
        pieceFavorite: { include: { piece: true, color: true } },
        patternFavorite: { include: { pattern: true, color: true } }
      }
    })
  } catch (err) {
    console.log(err)
    throw badGetFavorite
  }
}

export const updateFavorite = async (favoriteId, favoriteData) => {
  try {
    const fav = prisma.favorite.findFirst({
      where: { id: favoriteId },
      include: { model: true }
    })
    // if model changes on favorite, delete old pieces and pattern on favorite.
    if (favoriteData.modelId === fav.model.id) {
      let pieces = await getPieceFavoritesByFav(favoriteId)
    } else {
      await deletePieceFavoritesByFav(favoriteId)
    }
    const updatedFav = await prisma.favorite.update({
      where: { id: favoriteId },
      data: { ...favoriteData },
      include: {
        model: true,
        pieceFavorite: { include: { piece: true, color: true } },
        patternFavorite: { include: { pattern: true, color: true } }
      }
    })
    return updatedFav
  } catch (err) {
    throw badUpdateFavorite
  }
}

export const deleteFavorite = async (favoriteId) => {
  try {
    // await deletePieceFavoritesByFav(favoriteId)
    return await prisma.favorite.delete({
      where: { id: favoriteId },
      include: { model: true }
    })
  } catch (err) {
    throw badDeleteFavorite
  }
}

export const createPieceFavorite = async (pieceData) => {
  // name, shininess pieceId, colorId, favoriteId
  await prisma.pieceFavorite.create({ data: { ...pieceData } })
}

export const createPieceFavorites = async (piecesData) => {
  return await prisma.pieceFavorite.createMany({
    data: piecesData,
    include: { piece: true, color: true },
    skipDuplicates: true
  })
}

export const deletePieceFavoriteById = async (id) => {
  // delete by id
  // used on an individual basis when a pieceFavorite no longer exists on a part (default color / no color)
}

export const deletePieceFavoritesByFav = async (favoriteId) => {
  return await prisma.pieceFavorite.deleteMany({ where: { favoriteId } })
}

export const getPieceFavoritesByFav = async (favoriteId) => {
  return await prisma.pieceFavorite.findMany({
    where: { favoriteId },
    include: { piece: true, color: true }
  })
}

export const updatePieceFavoriteByFav = async (favoriteId, partsInfo) => {}
