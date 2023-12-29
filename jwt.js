import jwt from 'jsonwebtoken'
const { verify, sign } = jwt
export const { JWT_SECRET } = process.env

export const getCredIdFromToken = (auth) => {
  const prefix = 'Bearer '
  if (!auth.startsWith(prefix)) return { name: 'malformedToken', message: 'Token Malformed' }
  const token = auth.slice(prefix.length)
  const { id } = jwt.verify(token, JWT_SECRET)
  return id
}

export const getTokenFromCredId = (id) => {
  const token = sign({ id }, JWT_SECRET, { expiresIn: '1w' })
  return token
}

export default jwt
