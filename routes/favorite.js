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
} from '../controllers/favorite.js'

const favoriteRouter = express.Router()

favoriteRouter.post('/cc', contCreateCC)
favoriteRouter.get('/cc', contGetCC)
favoriteRouter.put('/cc/:ccId', contUpdateCC)
favoriteRouter.delete('/cc/:ccId', contDeleteCC)
favoriteRouter.get('/color', contGetColors)
favoriteRouter.get('/color/id/:colorId', contGetColorsById)
favoriteRouter.get('/color/n/:name', contGetColorByName)
favoriteRouter.get('/color/c/:code', contGetColorByCode)
favoriteRouter.get('/item', contGetItems)
favoriteRouter.get('/item/id/:itemId', contGetItemById)
favoriteRouter.get('/item/n/:name', contGetItemByName)
favoriteRouter.get('/item/c/:subtype', contGetItemBySubtype)
favoriteRouter.get('/item/t/:type', contGetItemByType)
favoriteRouter.get('/pattern', contGetPatterns)
favoriteRouter.get('/pattern/id/:patternId', contGetPatternById)
favoriteRouter.get('/pattern/n/:name', contGetPatternByName)

export default favoriteRouter
