import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const PORT = 5000 || process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())

app.listen(PORT, console.log(`server on na porta ${PORT}`))