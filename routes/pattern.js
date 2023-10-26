import express from 'express'
import prisma from '../prismaClient.js'
const pattern = express.Router()

pattern.post('/', async (req, res, next) => {})
pattern.get('/', async (req, res, next) => {})
pattern.put('/:patternId', async (req, res, next) => {})
pattern.delete('/:patternId', async (req, res, next) => {})

export default pattern
