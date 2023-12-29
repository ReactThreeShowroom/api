import express from 'express'
import prisma from '../prismaClient.js'
const clientChoiceRouter = express.Router()

clientChoiceRouter.post('/', async (req, res, next) => {})
clientChoiceRouter.get('/', async (req, res, next) => {})
clientChoiceRouter.put('/:clientChoiceId', async (req, res, next) => {})
clientChoiceRouter.delete('/:clientChoiceId', async (req, res, next) => {})

export default clientChoiceRouter
