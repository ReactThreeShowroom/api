import {
  getColorById,
  getColorByName,
  getColorByCode,
  getItemById,
  getItemByName,
  getItemBySubtype,
  getItemByType,
  getPattern,
  getPatternByName,
  getPatterns,
  getColors,
  getItems
} from '../db/favorites.js'
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
    res.status(201).send(await createFavorite(favoriteData))
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
    const { ccId: favoriteId } = req.params
    const { favoriteData } = req.body
    res.status(204).send(await updateFavorite(favoriteId, favoriteData))
  } catch (err) {
    next(err)
  }
}

export const contDeleteFavorite = async (req, res, next) => {
  try {
    const { ccId: favoriteId } = req.params
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

export const contGetItems = async (req, res, next) => {
  try {
    res.send(getItems())
  } catch (err) {
    next(err)
  }
}

export const contGetItemById = async (req, res, next) => {
  try {
    const { itemId } = req.params
    res.send(getItemById(itemId))
  } catch (err) {
    next(err)
  }
}

export const contGetItemByName = async (req, res, next) => {
  try {
    const { name } = req.params
    res.send(await getItemByName(name))
  } catch (err) {
    next(err)
  }
}

export const contGetItemBySubtype = async (req, res, next) => {
  try {
    const { subtype } = req.params
    res.send(await getItemBySubtype(subtype))
  } catch (err) {
    next(err)
  }
}

export const contGetItemByType = async (req, res, next) => {
  try {
    const { type } = req.params
    res.send(await getItemByType(type))
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
