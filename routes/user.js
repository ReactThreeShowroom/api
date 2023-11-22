import express from 'express'
import prisma from '../prismaClient.js'
const user = express.Router()

/**
 * User
 * id:         text
 * name:       text
 * email:      text
 * phone:      text
 * userCredId: text?
 *
 * UserCred
 * id:        text
 * username:  text
 * password:  text
 * googleSub: text?
 * userId:    text
 *
 */

user.post('/', async (req, res, next) => {})
user.get('/', async (req, res, next) => {})
user.put('/:userId', async (req, res, next) => {})
user.delete('/:userId', async (req, res, next) => {})

export default user
