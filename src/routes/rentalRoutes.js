import { Router } from 'express'
import { addNewRental, getAllRentals, returnRental } from '../controllers/rentalsController.js'
import { checkRental, checkRentalValues } from '../middlewares/rentalsMiddlewares.js'
import validateSchema from '../middlewares/validateSchemas.js'
import { rentalSchema } from '../schemas/rentalsSchema.js'


const rentalRoutes = Router()

rentalRoutes.post("/rentals", checkRentalValues, validateSchema(rentalSchema),addNewRental)
rentalRoutes.get("/rentals", getAllRentals)
rentalRoutes.post("/rentals/:id/return", checkRental,returnRental)
// rentalRoutes.delete("/rentals/:id", deleteRental)

export default rentalRoutes