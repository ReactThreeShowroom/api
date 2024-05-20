import express from 'express'
import { rebuildDB, triggerInitMigrate } from '../controllers/devSeed.js'
const seedRouter = express.Router()

seedRouter.post('/', async (req, res, next) => {
  try {
    const success = await rebuildDB()
    if (success === 'success') res.sendStatus(201)
    else {
      await triggerInitMigrate()
      const retry = await rebuildDB()
      if (retry === 'success') res.sendStatus(201)
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})

export default seedRouter
