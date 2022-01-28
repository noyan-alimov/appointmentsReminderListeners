import express from 'express'
import cors from 'cors'

import { handleInsertSubscription } from './handlers/insert'
import { config } from './config'


const app = express()
app.use(express.json())
app.use(cors())

app.post('/insert', (req, res) => {
  try {
    console.log(req.body)
    handleInsertSubscription(req.body.record)
    return res.status(201)
  } catch (error) {
    console.error('insert error: ', error)
    return res.status(500)
  }
})

app.listen(config.PORT, () => {
  console.log(`Listening on port: ${config.PORT}`)
})