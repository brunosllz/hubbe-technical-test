import express from 'express'
import { createServer } from 'node:http'

const app = express()

app.use(express.json())

const server = createServer(app)

export { server }
