import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import {
  clientRouter,
  clientChoiceRouter,
  colorRouter,
  itemRouter,
  patternRouter,
  userRouter,
  userCredRouter
} from './routes/index.js'
import { userCheck } from './controllers/user.js'

const welcomeMessage = `
<h1>Welcome to the ReactShowroomAPI</h1>
<p>Please choose one of these paths:</p>
<ul>
  <li>/client</li>
  <li>/clientChoice</li>
  <li>/color</li>
  <li>/item</li>
  <li>/pattern</li>
  <li>/user</li>
  <li>/userCred</li>
</ul>
`

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(userCheck)

app.use('/client', clientRouter)
app.use('/clientChoice', clientChoiceRouter)
app.use('/color', colorRouter)
app.use('/item', itemRouter)
app.use('/pattern', patternRouter)
app.use('/user', userRouter)
app.use('/userCred', userCredRouter)
app.use('/', (req, res) => {
  res.send(welcomeMessage)
})
app.use('*', (req, res) => {
  res.redirect('/')
})
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send({ name: 'serverError', message: 'Unknown Server Error' })
})

app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`)
  console.log(`\x1b[36mhttp://localhost:${PORT}\x1b[0m`)
})
