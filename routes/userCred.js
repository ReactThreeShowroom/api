import express from 'express'
import prisma from '../prismaClient.js'
const userCred = express.Router()

userCred.post('/', async (req, res, next) => {})
userCred.get('/', async (req, res, next) => {})
userCred.put('/:userCredId', async (req, res, next) => {})
userCred.delete('/:userCredId', async (req, res, next) => {})

export default userCred
