import prisma from '../prismaClient.js'

// model Color {
//   id            String         @id @unique @default(uuid())
//   name          String         @unique
//   code          String
//   rgb           String
//   hex           String
//   clientChoices ClientChoice[]
// }

export const createColor = async (colorData) => {
  try {
    return await prisma.color.create({ data: { ...colorData } })
  } catch (err) {
    throw { name: 'badCreateColor', message: 'Could not create Color. Try again', status: 400 }
  }
}

export const getColorById = async (colorId) => {
  try {
    return await prisma.color.findUnique({ where: { id: colorId } })
  } catch (err) {
    throw { name: 'badGetColor', message: 'Could not get Color. Try again', status: 400 }
  }
}

export const getColorByName = async (name) => {
  try {
    return await prisma.color.findUnique({ where: { name } })
  } catch (err) {
    throw { name: 'badGetColor', message: 'Could not get Color. Try again', status: 400 }
  }
}

export const getColorByCode = async (code) => {
  try {
    return await prisma.color.findUnique({ where: { code } })
  } catch (err) {
    throw { name: 'badGetColor', message: 'Could not get Color. Try again', status: 400 }
  }
}

export const updateColor = async (colorId, colorData) => {
  try {
    return await prisma.color.update({ where: { id: colorId }, data: { ...colorData } })
  } catch (err) {
    throw { name: 'badUpdateColor', message: 'Could not update Color. Try again', status: 400 }
  }
}

export const deleteColor = async (colorId) => {
  try {
    return await prisma.color.delete({ where: { id: colorId } })
  } catch (err) {
    throw { name: 'badDeleteColor', message: 'Could not delete Color. Try again', status: 400 }
  }
}

// model Item {
//   id           String         @id @unique @default(uuid())
//   name         String
//   path         String
//   type         String
//   subtype      String
//   ClientChoice ClientChoice[]
// }

export const createItem = async (itemData) => {
  try {
    return await prisma.item.create({ data: { ...itemData } })
  } catch (err) {
    throw { name: 'badCreateItem', message: 'Could not create Item. Try again', status: 400 }
  }
}

export const getItemById = async (itemId) => {
  try {
    return await prisma.item.findFirst({ where: { id: itemId } })
  } catch (err) {
    throw { name: 'badGetItem', message: 'Could not get Item. Try again', status: 400 }
  }
}

export const getItemByName = async (name) => {
  try {
    return await prisma.item.findFirst({ where: { name } })
  } catch (err) {
    throw { name: 'badGetItem', message: 'Could not get Item. Try again', status: 400 }
  }
}

export const getItemByType = async (type) => {
  try {
    return await prisma.item.findMany({ where: { type } })
  } catch (err) {
    throw { name: 'badGetItems', message: 'Could not get Items. Try again', status: 400 }
  }
}

export const getItemBySubtype = async (subtype) => {
  try {
    return await prisma.item.findMany({ where: { subtype } })
  } catch (err) {
    throw { name: 'badGetItems', message: 'Could not get Items. Try again', status: 400 }
  }
}

export const updateItem = async (itemId, itemData) => {
  try {
    return await prisma.item.update({ where: { id: itemId }, data: { ...itemData } })
  } catch (err) {
    throw { name: 'badUpdateItem', message: 'Could not update Item. Try again', status: 400 }
  }
}

export const deleteItem = async (itemId) => {
  try {
    return await prisma.item.delete({ where: { id: itemId } })
  } catch (err) {
    throw { name: 'badDeleteItem', message: 'Could not delete Item. Try again', status: 400 }
  }
}

// model Pattern {
//   id            String         @id @unique @default(uuid())
//   name          String         @unique
//   url           String
//   clientChoices ClientChoice[]
// }

export const createPattern = async (patternData) => {
  try {
    return await prisma.pattern.create({ data: { ...patternData } })
  } catch (err) {
    throw { name: 'badCreatePattern', message: 'Could not create Pattern. Try again', status: 400 }
  }
}

export const getPatterns = async () => {
  try {
    return await prisma.pattern.findMany()
  } catch (err) {
    throw { name: 'badGetPatterns', message: 'Could not get Patterns. Try again', status: 400 }
  }
}

export const getPattern = async (patternId) => {
  try {
    return await prisma.pattern.findUnique({ where: { id: patternId } })
  } catch (err) {
    throw { name: 'badGetPattern', message: 'Could not get Pattern. Try again', status: 400 }
  }
}
export const getPatternByName = async (name) => {
  try {
    return await prisma.pattern.findUnique({ where: { name } })
  } catch (err) {
    throw { name: 'badGetPattern', message: 'Could not get Pattern. Try again', status: 400 }
  }
}

export const editPattern = async (patternId, patternData) => {
  try {
    return await prisma.pattern.update({ where: { id: patternId }, data: { ...patternData } })
  } catch (err) {
    throw { name: 'badUpdatePattern', message: 'Could not update Pattern. Try again', status: 400 }
  }
}

export const deletePattern = async (patternId) => {
  try {
    return await prisma.pattern.delete({ where: { id: patternId } })
  } catch (err) {
    throw { name: 'badDeletePattern', message: 'Could not delete Pattern. Try again', status: 400 }
  }
}
