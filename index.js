import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { client, clientChoice, color, item, pattern, user, userCred } from './routes/index.js'

dotenv.config()

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

app.use('/client', client)
app.use('/clientChoice', clientChoice)
app.use('/color', color)
app.use('/item', item)
app.use('/pattern', pattern)
app.use('/user', user)
app.use('/userCred', userCred)
app.use('/', (req, res) => {
  res.send(welcomeMessage)
})
app.use('*', (req, res) => {
  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`)
  console.log(`\x1b[36mhttp://localhost:${PORT}\x1b[0m`)
})
