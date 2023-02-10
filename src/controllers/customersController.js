import { db } from "../config/database.js"

export async function getAllCustomers(req, res) {
    const {cpf} = req.query
    const {offset, limit} =  req.query
    
   
    try {
        if(cpf) {
       
            const gamesFilteres = await db.query(`SELECT * FROM customers WHERE cpf LIKE '${cpf}%'`)
            return res.send(gamesFilteres.rows)
        }
        if(offset) {
            const customers = await db.query(`SELECT * FROM customers OFFSET ${offset}`)
            return res.send(customers.rows)
        }
        if(limit) {
            const customers = await db.query(`SELECT * FROM customers LIMIT ${offset}`)
            return res.send(customers.rows)

        }
        if(offset && limit) {
            const customers = await db.query(`SELECT * FROM customers LIMIT ${limit} OFFSET ${offset}`)
            return res.send(customers.rows)

        }
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
        const userExist = await db.query(`SELECT * FROM customers WHERE cpf = $1 AND id<>$2`, [cpf, id])             
        if(userExist.rowCount !== 0 ) return res.sendStatus(409)
        await db.query(`UPDATE customers SET name='${name}', phone='${phone}',cpf='${cpf}',birthday='${birthday}' WHERE id = ${id}`)
        res.send()
    } catch (error) {
        res.status(500).send(error.message)
    }
}