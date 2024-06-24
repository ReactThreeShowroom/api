import express from 'express'

import {
  contCreateFavorite,
  contDeleteFavorite,
  contGetFavorites,
  contGetColors,
  contGetColorsById,
  contGetColorByCode,
  contGetColorByName,
  contUpdateFavorite,
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

favoriteRouter.post('/fav', contCreateFavorite)
favoriteRouter.get('/fav', contGetFavorites)
favoriteRouter.put('/fav/:favId', contUpdateFavorite)
favoriteRouter.delete('/fav/:favId', contDeleteFavorite)
favoriteRouter.get('/color', contGetColors)
favoriteRouter.get('/color/id/:colorId', contGetColorsById)
favoriteRouter.get('/color/n/:name', contGetColorByName)
favoriteRouter.get('/color/c/:code', contGetColorByCode)
favoriteRouter.get('/item', contGetItems)
favoriteRouter.get('/item/id/:itemId', contGetItemById)
favoriteRouter.get('/item/n/:name', contGetItemByName)
favoriteRouter.get('/item/t/:type', contGetItemByType)
favoriteRouter.get('/item/s/:subtype', contGetItemBySubtype)
favoriteRouter.get('/pattern', contGetPatterns)
favoriteRouter.get('/pattern/id/:patternId', contGetPatternById)
favoriteRouter.get('/pattern/n/:name', contGetPatternByName)

export default favoriteRouter
