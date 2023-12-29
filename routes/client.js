import express from 'express'
import prisma from '../prismaClient.js'
const clientRouter = express.Router()

clientRouter.post('/', async (req, res, next) => {})
clientRouter.get('/', async (req, res, next) => {})
clientRouter.put('/:clientId', async (req, res, next) => {})
clientRouter.delete('/:clientId', async (req, res, next) => {})

export default clientRouter
