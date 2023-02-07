import {Router} from 'express'

const customersRoutes = Router()

customersRoutes.get("/customers", getAllCustomers)
customersRoutes.get("/customers/:id", getCustomersById)
customersRoutes.post("customers", addNewCustomer)
customersRoutes.put("/customers/:id", updateCustomer)