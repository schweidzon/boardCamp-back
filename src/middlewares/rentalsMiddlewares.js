import { db } from "../config/database.js"

export async function checkRentalValues(req, res, next) {
    const { customerId, gameId, daysRented } = req.body
    if(isNaN(customerId) ||isNaN(gameId) || customerId <= 0 || gameId <= 0)  return res.sendStatus(400)

    try {
        const isCustomerIdValid = await db.query(`SELECT * FROM customers WHERE id = '${customerId}'`)
        const isGameIdValid = await db.query(`SELECT * FROM games WHERE id = '${gameId}'`)
        console.log(isGameIdValid.rows[0])
        if(!isGameIdValid.rows[0]) return res.senStatus(400)

        if (!isCustomerIdValid.rows[0] || !isGameIdValid.rows[0] || daysRented <= 0 || isGameIdValid.rows[0].stockTotal <= 0 ) return res.sendStatus(400)

        next()
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function checkRental(req, res ,next) {
    const {id} = req.params
    try {
        const rental = await db.query(`SELECT * FROM rentals WHERE id = '${id}'`)
        console.log(rental.rows[0])
        if(!rental.rows[0]) return res.sendStatus(404)
        if(rental.rows[0].returnDate !== null) return res.sendStatus(400)
        next()
    } catch (error) {
        res.status(500).send(error.message)
    }

}