import express from 'express'
import prisma from '../prismaClient.js'
const color = express.Router()

color.post('/', async (req, res, next) => {})
color.get('/', async (req, res, next) => {})
color.put('/:colorId', async (req, res, next) => {})
color.delete('/:colorId', async (req, res, next) => {})

export default color
