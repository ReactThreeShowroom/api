import express from 'express'
import {
  contCreateClient,
  contDeactivateClient,
  contGetClient,
  contGetClients,
  contReactivateOrUpdateClient
} from '../controllers/client.js'

const clientRouter = express.Router()

clientRouter.post('/', contCreateClient)
clientRouter.get('/', contGetClients)
clientRouter.get('/:clientId', contGetClient)
clientRouter.put('/:clientId', contReactivateOrUpdateClient)
clientRouter.delete('/:clientId', contDeactivateClient)

export default clientRouter
