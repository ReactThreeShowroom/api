import express from 'express'
import prisma from '../prismaClient.js'
const user = express.Router()

user.post('/', async (req, res, next) => {})
user.get('/', async (req, res, next) => {})
user.put('/:userId', async (req, res, next) => {})
user.delete('/:userId', async (req, res, next) => {})

export default user
