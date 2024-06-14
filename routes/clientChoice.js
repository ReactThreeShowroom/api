import express from 'express'

import {
  contCreateCC,
  contDeleteCC,
  contGetCC,
  contGetColors,
  contGetColorsById,
  contGetColorByCode,
  contGetColorByName,
  contUpdateCC,
  contGetItems,
  contGetItemById,
  contGetItemByName,
  contGetItemBySubtype,
  contGetItemByType,
  contGetPatterns,
  contGetPatternById,
  contGetPatternByName
} from '../controllers/clientChoice.js'

const ccRouter = express.Router()

ccRouter.post('/cc', contCreateCC)
ccRouter.get('/cc', contGetCC)
ccRouter.put('/cc/:ccId', contUpdateCC)
ccRouter.delete('/cc/:ccId', contDeleteCC)
ccRouter.get('/color', contGetColors)
ccRouter.get('/color/id/:colorId', contGetColorsById)
ccRouter.get('/color/n/:name', contGetColorByName)
ccRouter.get('/color/c/:code', contGetColorByCode)
ccRouter.get('/item', contGetItems)
ccRouter.get('/item/id/:itemId', contGetItemById)
ccRouter.get('/item/n/:name', contGetItemByName)
ccRouter.get('/item/c/:subtype', contGetItemBySubtype)
ccRouter.get('/item/t/:type', contGetItemByType)
ccRouter.get('/pattern', contGetPatterns)
ccRouter.get('/pattern/id/:patternId', contGetPatternById)
ccRouter.get('/pattern/n/:name', contGetPatternByName)

export default ccRouter
