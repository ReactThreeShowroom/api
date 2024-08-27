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
  contGetModels,
  contGetModelById,
  contGetModelByName,
  contGetModelBySubtype,
  contGetModelByType,
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
favoriteRouter.get('/item', contGetModels)
favoriteRouter.get('/item/id/:itemId', contGetModelById)
favoriteRouter.get('/item/n/:name', contGetModelByName)
favoriteRouter.get('/item/t/:type', contGetModelByType)
favoriteRouter.get('/item/s/:subtype', contGetModelBySubtype)
favoriteRouter.get('/pattern', contGetPatterns)
favoriteRouter.get('/pattern/id/:patternId', contGetPatternById)
favoriteRouter.get('/pattern/n/:name', contGetPatternByName)

export default favoriteRouter
