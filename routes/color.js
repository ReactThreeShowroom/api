import express from 'express'
import prisma from '../prismaClient.js'
const colorRouter = express.Router()

colorRouter.post('/', async (req, res, next) => {})
colorRouter.get('/', async (req, res, next) => {})
colorRouter.put('/:colorId', async (req, res, next) => {})
colorRouter.delete('/:colorId', async (req, res, next) => {})

export default colorRouter
