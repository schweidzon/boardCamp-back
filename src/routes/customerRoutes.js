import {Router} from 'express'
import { addNewCustomer, getAllCustomers } from '../controllers/customersController.js'

const customersRoutes = Router()

customersRoutes.get("/customers", getAllCustomers)
//customersRoutes.get("/customers/:id", getCustomersById)
customersRoutes.post("/customers", addNewCustomer)
//customersRoutes.put("/customers/:id", updateCustomer)

export default customersRoutes