import { db } from "../config/database.js"

export async function getAllCustomers(req, res) {
    try {
        const customers = await db.query("SELECT * FROM customers")
        res.send(customers.rows)
    } catch (error) {
        
    }
}

export async function getCustomersById(req, res) {
    const {id} = req.params
    try {
        const user = await  db.query(`SELECT * FROM customers WHERE id = '${id}'`)
        if(!user.rows[0]) return res.sendStatus(404)
        res.send(user.rows[0])
    } catch (error) {
        res.status(500).send(error.message)
    }

}

export async function addNewCustomer(req, res) {
    const {name, phone, cpf, birthday} = req.body
    
    try {
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ('${name}', '${phone}', '${cpf}', '${birthday}')`)
        res.send(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function updateCustomer(req, res) {
    const {name, phone, cpf, birthday} = req.body
    const {id} = req.params
    try {
        await db.query(`UPDATE customers SET name='${name}', phone='${phone}',cpf='${cpf}',birthday='${birthday}'`)
        res.send()
    } catch (error) {
        res.status(500).send(error.message)
    }
}