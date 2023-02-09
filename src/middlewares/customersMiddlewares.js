import { db } from "../config/database.js"

export async function checkCustomerValue(req, res, next) {
    const {name, phone, cpf, birthday} = req.body
    const {id} = req.params
    if(!name || phone.length < 10 || phone.length > 11 || cpf.length !== 11|| isNaN(cpf) || !birthday.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)) return res.sendStatus(400)
    if(!id) {
        try {
           
            const checkCustomer = await db.query(`SELECT * FROM customers WHERE cpf = '${cpf}' limit 1`)
            console.log(checkCustomer.rows[0])
            if(checkCustomer.rows[0]) return res.sendStatus(409)
            next()
        } catch (error) {
            res.status(500).send(error.message)
        }

    } else {
        next()
    }
   

}