import {Router} from 'express'

const rentalRoutes = Router()

rentalRoutes.get("/rentals", getAllRentals)
rentalRoutes.post("rentals", addNewRental)
rentalRoutes.post("/rentals/:id/return", returnRental)
rentalRoutes.delete("/rentals/:id", deleteRental)