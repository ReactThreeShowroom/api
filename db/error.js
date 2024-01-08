import prisma from '../prismaClient.js'

export const addError = async (err) => {
  try {
    const { name, message, status } = err
    const addedError = await prisma.error.create({ name, message, status: status ? status : 520 })
  } catch (error) {
    console.error(error)
  }
}
