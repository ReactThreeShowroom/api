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
favoriteRouter.get('/model', contGetModels)
favoriteRouter.get('/model/id/:modelId', contGetModelById)
favoriteRouter.get('/model/n/:name', contGetModelByName)
favoriteRouter.get('/model/t/:type', contGetModelByType)
favoriteRouter.get('/model/s/:subtype', contGetModelBySubtype)
favoriteRouter.get('/pattern', contGetPatterns)
favoriteRouter.get('/pattern/id/:patternId', contGetPatternById)
favoriteRouter.get('/pattern/n/:name', contGetPatternByName)

export default favoriteRouter
