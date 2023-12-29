import express from 'express'
import prisma from '../prismaClient.js'
const itemRouter = express.Router()

itemRouter.post('/', async (req, res, next) => {})
itemRouter.get('/', async (req, res, next) => {})
itemRouter.put('/:itemId', async (req, res, next) => {})
itemRouter.delete('/:itemId', async (req, res, next) => {})

export default itemRouter
