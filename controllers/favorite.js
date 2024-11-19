import {
  getColorById,
  getColorByName,
  getColorByCode,
  getModelById,
  getModelByName,
  getModelBySubtype,
  getModelByType,
  getPattern,
  getPatternByName,
  getPatterns,
  getColors,
  getModels
} from '../db/favorite.js'
import {
  createFavorite,
  deleteFavorite,
  getFavorite,
  getFavorites,
  updateFavorite
} from '../db/client.js'

export const contCreateFavorite = async (req, res, next) => {
  try {
    const { favoriteData } = req.body
    if (!favoriteData.notes) favoriteData.notes = ''
    const _fav = await createFavorite(favoriteData)
    res.status(201).send(_fav)
  } catch (err) {
    next(err)
  }
}

export const contGetFavorites = async (req, res, next) => {
  try {
    const { type, id } = req.query
    if (type === 'single') res.send(await getFavorite(id))
    else res.send(await getFavorites(id))
  } catch (err) {
    next(err)
  }
}

export const contUpdateFavorite = async (req, res, next) => {
  try {
    const {
      params: { favId },
      body: { favoriteData }
    } = req
    const { notes, modelId } = favoriteData
    await updateFavorite(favId, { notes, modelId })

    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export const contDeleteFavorite = async (req, res, next) => {
  try {
    const { favoriteId } = req.params
    res.status(204).send(await deleteFavorite(favoriteId))
  } catch (err) {
    next(err)
  }
}

export const contGetColors = async (req, res, next) => {
  try {
    res.send(await getColors())
  } catch (err) {
    next(err)
  }
}

export const contGetColorsById = async (req, res, next) => {
  try {
    const { colorId } = req.params
    res.send(getColorById(colorId))
  } catch (err) {
    next(err)
  }
}

export const contGetColorByName = async (req, res, next) => {
  try {
    const { name } = req.params
    res.send(getColorByName(name))
  } catch (err) {
    next(err)
  }
}

export const contGetColorByCode = async (req, res, next) => {
  try {
    const { code } = req.params
    res.send(getColorByCode(code))
  } catch (err) {
    next(err)
  }
}

export const contGetModels = async (req, res, next) => {
  try {
    res.send(await getModels())
  } catch (err) {
    next(err)
  }
}

export const contGetModelById = async (req, res, next) => {
  try {
    const { modelId } = req.params
    res.send(getModelById(modelId))
  } catch (err) {
    next(err)
  }
}

export const contGetModelByName = async (req, res, next) => {
  try {
    const { name } = req.params
    res.send(await getModelByName(name))
  } catch (err) {
    next(err)
  }
}

export const contGetModelBySubtype = async (req, res, next) => {
  try {
    const { subtype } = req.params
    res.send(await getModelBySubtype(subtype))
  } catch (err) {
    next(err)
  }
}

export const contGetModelByType = async (req, res, next) => {
  try {
    const { type } = req.params
    res.send(await getModelByType(type))
  } catch (err) {
    next(err)
  }
}

export const contGetPatterns = async (req, res, next) => {
  try {
    res.send(getPatterns())
  } catch (err) {
    next(err)
  }
}

export const contGetPatternById = async (req, res, next) => {
  try {
    const { patternId } = req.params
    res.send(await getPattern(patternId))
  } catch (err) {
    next(err)
  }
}
export const contGetPatternByName = async (req, res, next) => {
  try {
    const { name } = req.params
    res.send(await getPatternByName(name))
  } catch (err) {
    next(err)
  }
}
