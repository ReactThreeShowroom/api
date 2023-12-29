import express from 'express'
import prisma from '../prismaClient.js'
const patternRouter = express.Router()

patternRouter.post('/', async (req, res, next) => {})
patternRouter.get('/', async (req, res, next) => {})
patternRouter.put('/:patternId', async (req, res, next) => {})
patternRouter.delete('/:patternId', async (req, res, next) => {})

export default patternRouter
