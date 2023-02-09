import {Router} from 'express'
import { addNewCustomer, getAllCustomers, getCustomersById, updateCustomer } from '../controllers/customersController.js'
import { checkCustomerValue } from '../middlewares/customersMiddlewares.js'

const customersRoutes = Router()

customersRoutes.get("/customers", getAllCustomers)
customersRoutes.get("/customers/:id", getCustomersById)
customersRoutes.post("/customers", checkCustomerValue,addNewCustomer)
customersRoutes.put("/customers/:id",updateCustomer)

export default customersRoutes