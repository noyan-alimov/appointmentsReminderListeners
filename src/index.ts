import express from 'express'
import cors from 'cors'

import { handleInsertAppointment } from './handlers/insert'
import { config } from './config'
import { handleDeleteAppointment } from './handlers/delete'
import { handleUpdateAppointment } from './handlers/update'


const app = express()
app.use(express.json())
app.use(cors())

app.post('/insert', (req, res) => {
  try {
    console.log(req.body)
    handleInsertAppointment(req.body.record)
    return res.status(201)
  } catch (error) {
    console.error('insert error: ', error)
    return res.status(500)
  }
})

app.post('/delete', (req, res) => {
  try {
    console.log(req.body)
    handleDeleteAppointment(req.body.old_record)
    return res.status(201)
  } catch (error) {
    console.error('delete error: ', error)
    return res.status(500)
  }
})

app.post('/update', (req, res) => {
  try {
    console.log(req.body)
    handleUpdateAppointment(req.body.record)
    return res.status(201)
  } catch (error) {
    console.error('update error: ', error)
    return res.status(500)
  }
})

app.listen(config.PORT, () => {
  console.log(`Listening on port: ${config.PORT}`)
})