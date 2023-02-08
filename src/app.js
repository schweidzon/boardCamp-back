import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import gameRoutes from './routes/gameRoutes.js'
import customersRoutes from './routes/customerRoutes.js'
import rentalRoutes from './routes/rentalRoutes.js'


dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors())

app.use([gameRoutes, customersRoutes, rentalRoutes])

app.listen(PORT, console.log(`server on na porta ${PORT}`))