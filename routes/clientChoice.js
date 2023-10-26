import express from 'express'
import prisma from '../prismaClient.js'
const clientChoice = express.Router()

clientChoice.post('/', async (req, res, next) => {})
clientChoice.get('/', async (req, res, next) => {})
clientChoice.put('/:clientChoiceId', async (req, res, next) => {})
clientChoice.delete('/:clientChoiceId', async (req, res, next) => {})

export default clientChoice
