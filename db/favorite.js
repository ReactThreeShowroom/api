import prisma from '../prismaClient.js'
import {
  badCreateColor,
  badGetColor,
  badGetColors,
  badUpdateColor,
  badDeleteColor,
  badCreateModel,
  badUpdateModel,
  badGetModel,
  badGetModels,
  badDeleteModel,
  badCreatePattern,
  badGetPattern,
  badGetPatterns,
  badUpdatePattern,
  badDeletePattern,
  badCreatePiece
} from '../errorCodes.js'

export const createColor = async (colorData) => {
  try {
    return await prisma.color.create({ data: { ...colorData } })
  } catch (err) {
    console.log(colorData.code)
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

export const createModel = async (modelData) => {
  try {
    return await prisma.model.create({ data: { ...modelData } })
  } catch (err) {
    throw badCreateModel
  }
}

export const getModels = async () => {
  try {
    const models = await prisma.model.findMany()
    // console.log(models)
    return models
  } catch (err) {
    throw badGetModels
  }
}

export const getModelById = async (modelId) => {
  try {
    return await prisma.model.findFirst({ where: { id: modelId } })
  } catch (err) {
    throw badGetModel
  }
}

export const getModelByName = async (name) => {
  try {
    return await prisma.model.findFirst({ where: { name } })
  } catch (err) {
    throw badGetModel
  }
}

export const getModelByType = async (type) => {
  try {
    return await prisma.model.findMany({ where: { type } })
  } catch (err) {
    throw badGetModels
  }
}

export const getModelBySubtype = async (subtype) => {
  try {
    return await prisma.model.findMany({ where: { subtype } })
  } catch (err) {
    throw badGetModels
  }
}

export const updateModel = async (modelId, modelData) => {
  try {
    return await prisma.model.update({ where: { id: modelId }, data: { ...modelData } })
  } catch (err) {
    throw badUpdateModel
  }
}

export const deleteModel = async (modelId) => {
  try {
    return await prisma.model.delete({ where: { id: modelId } })
  } catch (err) {
    throw badDeleteModel
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

export const createPiece = async (pieceData) => {
  try {
    const model = await getModelByName(pieceData.belongsTo)
    return await prisma.piece.create({
      data: { name: pieceData.name, modelId: model.id },
      include: { model: true }
    })
  } catch (err) {
    throw badCreatePiece
  }
}
