import express from 'express'
import { rebuildDB } from '../controllers/devSeed.js'
const seedRouter = express.Router()

seedRouter.post('/', async (req, res, next) => {
  try {
    const success = await rebuildDB()
    if (success === 'success') res.sendStatus(201)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

export default seedRouter
