import dayjs from "dayjs"
import { db } from "../config/database.js"



export async function addNewRental(req, res) {
    //const {customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee} = req.body
    const { customerId, gameId, daysRented } = req.body
    const today = dayjs()
    const test = { customerId, gameId }
    

    res.locals.session = test
    try {
        const gameData = await db.query(`SELECT * FROM games WHERE id = ${gameId}`)
        const game = gameData.rows[0]

        const originalPrice = Number(gameData.rows[0].pricePerDay * daysRented)
        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented","returnDate","originalPrice","delayFee") VALUES ('${customerId}', '${gameId}', '${today.format('YYYY-MM-DD')}','${daysRented}', null,${originalPrice}, ${0} )`)
        res.send(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getAllRentals(req, res) {


    try {
        const rentals = await db.query("SELECT * FROM rentals")
        const resp = await Promise.all(rentals.rows.map(async (rental) => {

            const customer = await db.query(`SELECT * FROM customers where id = '${rental.customerId}'`)

            const game = await db.query(`SELECT * FROM games where id = '${rental.gameId}'`)
            return { ...rental, customer: { id: customer.rows[0].id, name: customer.rows[0].name }, game: { id: game.rows[0].id, name: game.rows[0].name } }
        }))


        res.send(resp)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function returnRental(req, res) {
    const { id } = req.params
    console.log(id)
    const today = dayjs()
    //const text = today.add(2, 'day')
    try {
        const rental = await db.query(`SELECT * FROM rentals WHERE id = '${id}'`)

        const rentedDay = String((rental.rows[0].rentDate)).split(' ')

        const dayToReturn = Number(rentedDay[2]) + Number(rental.rows[0].daysRented)

        const pricePerDay = (rental.rows[0].originalPrice) / (rental.rows[0].daysRented)

        const daysToTax = Number((String(today).split(" "))[1]) - dayToReturn

        let taxFee = 0 

        if (daysToTax !== 0 && daysToTax > 0) {
            taxFee = (daysToTax * pricePerDay)
        } 
       

        await db.query(`UPDATE rentals SET "returnDate" = '${today.format('YYYY-MM-DD')}', "delayFee" = ${taxFee} WHERE  id = '${id}'`)
        res.send()


    } catch (error) {
        res.status(500).send(error.message)
    }
}

