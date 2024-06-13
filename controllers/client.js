import {
  createClient,
  deactivateClient,
  getClient,
  getClients,
  getInactiveClients,
  reactivateClient,
  updateClient
} from '../db/client.js'

export const contCreateClient = async (req, res, next) => {
  try {
    const { clientData } = req.body
    res.status(201).send(await createClient(clientData))
  } catch (err) {
    next(err)
  }
}

export const contGetClients = async (req, res, next) => {
  try {
    res.status(200).send(await getClients())
  } catch (err) {
    next(err)
  }
}

export const contGetClient = async (req, res, next) => {
  try {
    const { u } = req.query
    const { clientId } = req.params
    const query = u ? getInactiveClients : getClient
    res.status(200).send(await query(clientId))
  } catch (err) {
    next(err)
  }
}

export const contReactivateOrUpdateClient = async (req, res, next) => {
  try {
    const { r } = req.query
    const { clientId } = req.params
    const { clientData } = req.body
    const query = r ? reactivateClient : updateClient
    res.status(204).send(await query(clientId, clientData))
  } catch (err) {
    next(err)
  }
}

export const contDeactivateClient = async (req, res, next) => {
  try {
    const { clientId } = req.params
    res.status(204).send(await deactivateClient(clientId))
  } catch (err) {
    next(err)
  }
}
