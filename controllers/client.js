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
    console.log('creating client', clientData)
    res.status(201).send(await createClient(clientData))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export const contGetClients = async (req, res, next) => {
  try {
    // typeof i === boolean ("inactive")
    console.log('getting clients')
    const { u, i } = req.query
    // console.log(u)
    // console.log(i)
    const query = i ? getInactiveClients : getClients
    res.status(200).send(await query(u))
  } catch (err) {
    next(err)
  }
}

export const contGetClient = async (req, res, next) => {
  try {
    const {
      params: { clientId }
    } = req
    res.status(200).send(await getClient(clientId))
  } catch (err) {
    next(err)
  }
}

export const contReactivateOrUpdateClient = async (req, res, next) => {
  try {
    const {
      params: { clientId },
      query: { r },
      body: { clientData }
    } = req
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
