import { db } from "../config/database.js"

export async function getAllCustomers(req, res) {
    try {
        const customers = await db.query("SELECT * FROM customers")
        res.send(customers.rows)
    } catch (error) {
        
    }
}

export async function addNewCustomer(req, res) {
    const {name, phone, cpf, birthday} = req.body
    try {
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ('${name}', '${phone}', '${cpf}', '${birthday}')`)
        res.send(201)
    } catch (error) {
        
    }
}