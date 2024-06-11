import express from 'express'
import prisma from '../prismaClient.js'
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
const ccRouter = express.Router()

ccRouter.post('/cc', async (req, res, next) => {
  try {
    const { choiceData } = req.body
    res.status(201).send(await createChoice(choiceData))
  } catch (err) {
    next(err)
  }
})
ccRouter.get('/cc', async (req, res, next) => {
  try {
    const { type, id } = req.query
    if (type === 'single') res.send(await getChoice(id))
    else res.send(await getChoices(id))
  } catch (err) {
    next(err)
  }
})
ccRouter.put('/cc/:ccId', async (req, res, next) => {
  try {
    const { ccId: choiceId } = req.params
    const { choiceData } = req.body
    res.status(204).send(await updateChoice(choiceId, choiceData))
  } catch (err) {
    next(err)
  }
})
ccRouter.delete('/cc/:ccId', async (req, res, next) => {
  try {
    const { ccId: choiceId } = req.params
    res.status(204).send(await deleteChoice(choiceId))
  } catch (err) {
    next(err)
  }
})
ccRouter.get('/color', async (req, res, next) => {
  try {
    res.send(await getColors())
  } catch (err) {
    next(err)
  }
})
ccRouter.get('/color/id/:colorId', async (req, res, next) => {
  try {
    const { colorId } = req.params
    res.send(getColorById(colorId))
  } catch (err) {
    next(err)
  }
})
ccRouter.get('/color/n/:name', async (req, res, next) => {
  try {
    const { name } = req.params
    res.send(getColorByName(name))
  } catch (err) {
    next(err)
  }
})
ccRouter.get('/color/c/:code', async (req, res, next) => {
  try {
    const { code } = req.params
    res.send(getColorByCode(code))
  } catch (err) {
    next(err)
  }
})
ccRouter.get('/item', async (req, res, next) => {
  try {
    res.send(getItems())
  } catch (err) {
    next(err)
  }
})
ccRouter.get('/item/id/:itemId', async (req, res, next) => {
  try {
    const { itemId } = req.params
    res.send(getItemById(itemId))
  } catch (err) {
    next(err)
  }
})
ccRouter.get('/item/n/:name', async (req, res, next) => {
  try {
    const { name } = req.params
    res.send(await getItemByName(name))
  } catch (err) {
    next(err)
  }
})
ccRouter.get('/item/c/:subtype', async (req, res, next) => {
  try {
    const { subtype } = req.params
    res.send(await getItemBySubtype(subtype))
  } catch (err) {
    next(err)
  }
})
ccRouter.get('/item/t/:type', async (req, res, next) => {
  try {
    const { type } = req.params
    res.send(await getItemByType(type))
  } catch (err) {
    next(err)
  }
})
ccRouter.get('/pattern', async (req, res, next) => {
  try {
    res.send(getPatterns())
  } catch (err) {
    next(err)
  }
})
ccRouter.get('/pattern/id/:patternId', async (req, res, next) => {
  try {
    const { patternId } = req.params
    res.send(await getPattern(patternId))
  } catch (err) {
    next(err)
  }
})
ccRouter.get('/pattern/n/:name', async (req, res, next) => {
  try {
    const { name } = req.params
    res.send(await getPatternByName(name))
  } catch (err) {
    next(err)
  }
})

export default ccRouter
