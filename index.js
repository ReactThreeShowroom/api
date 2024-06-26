import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { clientRouter, favoriteRouter, userRouter, authRouter, seedRouter } from './routes/index.js'
import { noUserCheck, userCheck } from './controllers/user.js'
import { addError } from './db/error.js'
const welcomeMessage = `
<h1>Welcome to the ReactShowroomAPI</h1>
<p>Please choose one of these paths:</p>
<ul>
  <li>/client</li>
  <li>/clientFavorite</li>
  <li>/color</li>
  <li>/item</li>
  <li>/pattern</li>
  <li>/user</li>
  <li>/auth</li>
</ul>
`

const PORT = process.env.PORT || 3000
const app = express()
app.disable('x-powered-by')

// imported middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// custom middleware
app.use(userCheck)

// routes
app.use('/seed', seedRouter)
app.use('/client', clientRouter)
app.use('/favorite', favoriteRouter)
app.use('/user', noUserCheck, userRouter)
app.use('/auth', authRouter)
app.use('/', (req, res) => {
  res.send(welcomeMessage)
})
app.use('*', (req, res) => {
  res.redirect('/')
})

// error handling
app.use(async (err, req, res, next) => {
  const { status = 500 } = err
  console.error(err)
  await addError(err)
  res.status(status).send(err)
})

app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`)
  console.log(`\x1b[36mhttp://localhost:${PORT}\x1b[0m`)
})
