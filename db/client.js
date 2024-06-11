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

// Choices

export const createChoice = async (Ids) => {
  try {
    const { clientId, itemId, colorId, patternId } = Ids
    const newChoice = await prisma.clientChoice.create({ data: { ...Ids } })
    return newChoice
  } catch (err) {
    throw {
      name: 'badCreateChoice',
      message: 'Something went wrong creating Client Choice. Please try again.',
      status: 400
    }
  }
}

export const getChoices = async (clientId) => {
  try {
    const choices = await prisma.clientChoice.findMany({ where: { clientId } })
    return choices
  } catch (err) {
    throw {
      name: 'badGetChoices',
      message: 'Something went wrong getting Client Choices. Please try again.',
      status: 400
    }
  }
}
export const getChoice = async (choiceId) => {
  try {
    const choice = await prisma.clientChoice.findFirst({ where: { id: choiceId } })
    return choice
  } catch (err) {
    throw {
      name: 'badGetChoice',
      message: 'Something went wrong getting Client Choice. Please try again.',
      status: 400
    }
  }
}

export const updateChoice = async (choiceId, choiceData) => {
  try {
    const updatedChoice = await prisma.clientChoice.update({
      where: { id: choiceId },
      data: { ...choiceData }
    })
  } catch (err) {
    throw {
      name: 'badUpdateChoice',
      message: 'Something went wrong updating Client Choice. Please try again.',
      status: 400
    }
  }
}

export const deleteChoice = async (choiceId) => {
  try {
    const deletedChoice = await prisma.clientChoice.delete({ where: { id: choiceId } })
    return deletedChoice
  } catch (err) {
    throw {
      name: 'badCreateChoice',
      message: 'Something went wrong creating Client Choice. Please try again.',
      status: 400
    }
  }
}
