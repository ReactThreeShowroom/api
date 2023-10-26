import express from 'express'
import prisma from '../prismaClient.js'
const item = express.Router()

item.post('/', async (req, res, next) => {})
item.get('/', async (req, res, next) => {})
item.put('/:itemId', async (req, res, next) => {})
item.delete('/:itemId', async (req, res, next) => {})

export default item
