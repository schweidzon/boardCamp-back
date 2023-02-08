import { Router } from 'express'
import { addNewRental, getAllRentals, returnRental } from '../controllers/rentalsController.js'


const rentalRoutes = Router()

rentalRoutes.post("/rentals", addNewRental)
rentalRoutes.get("/rentals", getAllRentals)
rentalRoutes.post("/rentals/:id/return", returnRental)
// rentalRoutes.delete("/rentals/:id", deleteRental)

export default rentalRoutes