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
} from '../db/choiceDetails.js'
import { createChoice, deleteChoice, getChoice, getChoices, updateChoice } from '../db/client.js'

export const contCreateCC = async (req, res, next) => {
  try {
    const { choiceData } = req.body
    res.status(201).send(await createChoice(choiceData))
  } catch (err) {
    next(err)
  }
}

export const contGetCC = async (req, res, next) => {
  try {
    const { type, id } = req.query
    if (type === 'single') res.send(await getChoice(id))
    else res.send(await getChoices(id))
  } catch (err) {
    next(err)
  }
}

export const contUpdateCC = async (req, res, next) => {
  try {
    const { ccId: choiceId } = req.params
    const { choiceData } = req.body
    res.status(204).send(await updateChoice(choiceId, choiceData))
  } catch (err) {
    next(err)
  }
}

export const contDeleteCC = async (req, res, next) => {
  try {
    const { ccId: choiceId } = req.params
    res.status(204).send(await deleteChoice(choiceId))
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
