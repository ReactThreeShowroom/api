import express from 'express'
import prisma from '../prismaClient.js'
const client = express.Router()

client.post('/', async (req, res, next) => {})
client.get('/', async (req, res, next) => {})
client.put('/:clientId', async (req, res, next) => {})
client.delete('/:clientId', async (req, res, next) => {})

export default client
