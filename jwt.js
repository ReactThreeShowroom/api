import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { createCipheriv, createDecipheriv } from 'crypto'
const { verify, sign } = jwt

const { JWT_SECRET, EMAIL_KEY: CIPHER_KEY } = process.env

export const getIdFromToken = (auth) => {
  const prefix = 'Bearer '
  if (!auth.startsWith(prefix))
    throw new Error({
      name: 'TokenMalformed',
      message: `Authorization token must start with '${prefix}'`,
      status: 400
    })

  const id = verify(auth.slice(prefix.length), JWT_SECRET)
  if (!id)
    throw new Error({
      name: 'AuthorizationHeaderError',
      message: 'Authorization token malformed',
      status: 401
    })

  return id
}

export const getTokenFromId = (id) => sign(id, JWT_SECRET, { expiresIn: '1w' })

export const getCipherFromText = (text) => {
  const cipher = createCipheriv('aes-256-cbc', CIPHER_KEY, null)
  const emailCipher = cipher.update(text, 'utf8', 'hex') + cipher.final('hex')
  return emailCipher
}

export const getTextFromCipher = (encryption) => {
  const decipher = createDecipheriv('aes-256-cbc', CIPHER_KEY, null)
  const email = decipher.update(encryption, 'hex', 'utf8') + decipher.final('utf8')
  return email
}

// export const getEmailFromHash = (hash) =>

export const hashPass = async (password) => await bcrypt.hash(password, 10)

export const verifyPass = async (password, hashedPass) => bcrypt.compare(password, hashedPass)

export default jwt
