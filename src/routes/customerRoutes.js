import {Router} from 'express'
import { addNewCustomer, getAllCustomers, getCustomersById, updateCustomer } from '../controllers/customersController.js'
import { checkCustomerValue } from '../middlewares/customersMiddlewares.js'
import validateSchema from '../middlewares/validateSchemas.js'
import { customersSchema } from '../schemas/customersSchema.js'

const customersRoutes = Router()

customersRoutes.get("/customers", getAllCustomers)
customersRoutes.get("/customers/:id", getCustomersById)
customersRoutes.post("/customers", checkCustomerValue, validateSchema(customersSchema),addNewCustomer)
customersRoutes.put("/customers/:id", validateSchema(customersSchema),updateCustomer)

export default customersRoutes