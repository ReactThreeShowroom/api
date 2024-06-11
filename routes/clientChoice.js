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
  getPatterns
} from '../db/clientChoice.js'
const ccRouter = express.Router()

ccRouter.post('/', async (req, res, next) => {})
ccRouter.get('/color', async (req, res, next) => {})
ccRouter.get('/color/:colorId', async (req, res, next) => {})
ccRouter.get('/color/:name', async (req, res, next) => {})
ccRouter.get('/color/:code', async (req, res, next) => {})
ccRouter.get('/item', async (req, res, next) => {})
ccRouter.get('/item/:itemId', async (req, res, next) => {})
ccRouter.get('/item/:name', async (req, res, next) => {})
ccRouter.get('/item/:subtype', async (req, res, next) => {})
ccRouter.get('/item/:type', async (req, res, next) => {})
ccRouter.get('/pattern', async (req, res, next) => {})
ccRouter.get('/pattern/:patternId', async (req, res, next) => {})
ccRouter.get('/pattern/:name', async (req, res, next) => {})
ccRouter.put('/:clientChoiceId', async (req, res, next) => {})
ccRouter.delete('/:clientChoiceId', async (req, res, next) => {})

export default ccRouter
