import prisma from '../prismaClient.js'
import {
  badCreateColor,
  badGetColor,
  badGetColors,
  badUpdateColor,
  badDeleteColor,
  badCreateItem,
  badUpdateItem,
  badGetItem,
  badGetItems,
  badDeleteItem,
  badCreatePattern,
  badGetPattern,
  badGetPatterns,
  badUpdatePattern,
  badDeletePattern
} from '../errorCodes.js'

export const createColor = async (colorData) => {
  try {
    return await prisma.color.create({ data: { ...colorData } })
  } catch (err) {
    throw badCreateColor
  }
}

export const getColors = async () => {
  try {
    return await prisma.color.findMany()
  } catch (err) {
    throw badGetColors
  }
}

export const getColorById = async (colorId) => {
  try {
    return await prisma.color.findUnique({ where: { id: colorId } })
  } catch (err) {
    throw badGetColor
  }
}

export const getColorByName = async (name) => {
  try {
    return await prisma.color.findMany({ where: { name } })
  } catch (err) {
    throw badGetColor
  }
}

export const getColorByCode = async (code) => {
  try {
    return await prisma.color.findUnique({ where: { code } })
  } catch (err) {
    throw badGetColor
  }
}

export const updateColor = async (colorId, colorData) => {
  try {
    return await prisma.color.update({ where: { id: colorId }, data: { ...colorData } })
  } catch (err) {
    throw badUpdateColor
  }
}

export const deleteColor = async (colorId) => {
  try {
    return await prisma.color.delete({ where: { id: colorId } })
  } catch (err) {
    throw badDeleteColor
  }
}

export const createItem = async (itemData) => {
  try {
    return await prisma.item.create({ data: { ...itemData } })
  } catch (err) {
    throw badCreateItem
  }
}

export const getItems = async () => {
  try {
    return await prisma.item.findMany()
  } catch (err) {
    throw badGetItems
  }
}

export const getItemById = async (itemId) => {
  try {
    return await prisma.item.findFirst({ where: { id: itemId } })
  } catch (err) {
    throw badGetItem
  }
}

export const getItemByName = async (name) => {
  try {
    return await prisma.item.findFirst({ where: { name } })
  } catch (err) {
    throw badGetItem
  }
}

export const getItemByType = async (type) => {
  try {
    return await prisma.item.findMany({ where: { type } })
  } catch (err) {
    throw badGetItems
  }
}

export const getItemBySubtype = async (subtype) => {
  try {
    return await prisma.item.findMany({ where: { subtype } })
  } catch (err) {
    throw badGetItems
  }
}

export const updateItem = async (itemId, itemData) => {
  try {
    return await prisma.item.update({ where: { id: itemId }, data: { ...itemData } })
  } catch (err) {
    throw badUpdateItem
  }
}

export const deleteItem = async (itemId) => {
  try {
    return await prisma.item.delete({ where: { id: itemId } })
  } catch (err) {
    throw badDeleteItem
  }
}

export const createPattern = async (patternData) => {
  try {
    return await prisma.pattern.create({ data: { ...patternData } })
  } catch (err) {
    throw badCreatePattern
  }
}

export const getPatterns = async () => {
  try {
    return await prisma.pattern.findMany()
  } catch (err) {
    throw badGetPatterns
  }
}

export const getPattern = async (patternId) => {
  try {
    return await prisma.pattern.findUnique({ where: { id: patternId } })
  } catch (err) {
    throw badGetPattern
  }
}
export const getPatternByName = async (name) => {
  try {
    return await prisma.pattern.findUnique({ where: { name } })
  } catch (err) {
    throw badGetPattern
  }
}

export const editPattern = async (patternId, patternData) => {
  try {
    return await prisma.pattern.update({ where: { id: patternId }, data: { ...patternData } })
  } catch (err) {
    throw badUpdatePattern
  }
}

export const deletePattern = async (patternId) => {
  try {
    return await prisma.pattern.delete({ where: { id: patternId } })
  } catch (err) {
    throw badDeletePattern
  }
}
