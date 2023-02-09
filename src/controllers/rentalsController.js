import dayjs from "dayjs"
import { db } from "../config/database.js"



export async function addNewRental(req, res) {
    //const {customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee} = req.body
    const { customerId, gameId, daysRented } = req.body
    const today = dayjs()
    const test = { customerId, gameId }
    

    try {
        const gameData = await db.query(`SELECT * FROM games WHERE id = ${gameId}`)
        const stock = gameData.rows[0].stockTotal
      

        const originalPrice = Number(gameData.rows[0].pricePerDay * daysRented)
        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented","returnDate","originalPrice","delayFee") VALUES ('${customerId}', '${gameId}', '${today.format('YYYY-MM-DD')}','${daysRented}', null,${originalPrice}, null )`)
        await db.query(`UPDATE games SET "stockTotal" = ${stock - 1} WHERE id = ${gameId}`)
        res.send(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getAllRentals(req, res) {


    try {
        
        const rentals = await db.query(`
        SELECT rentals.*, 
        json_build_object('id', customers.id, 'name', customers.name) AS customer,
        json_build_object('id', games.id, 'name', games.name) AS game
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id
        `
        )

        // SELECT rentals.*, => Seleciona todas as colunas da tabela rentals
        // json_build_object('id', customers.id, 'name', customers.name) AS customer, => cria um objecto JSON da tabela customers e chama de customer 
        // json_build_object('id', games.id, 'name', games.name) AS game=> cria um objecto JSON da tabela games e chama de game 
        // FROM rentals
        // JOIN customers ON rentals."customerId" = customers.id => Junta, de acordo com as condições que fizemos em cima, a tabela customers na de rentals
        // JOIN games ON rentals."gameId" = games.id => Junta, de acordo com as condições que fizemos em cima, a tabela games na de rentals
        // `

        res.send(rentals.rows)
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

export async function deleteRental(req, res) {
    const {id} = req.params
    
    try {
        const rental = await db.query(`SELECT * FROM rentals WHERE id = '${id}'`)
        console.log(rental.rows[0])
        if(!rental.rows[0]) return res.sendStatus(404)
        if(rental.rows[0].returnDate === null)return res.sendStatus(400)
        await db.query(`DELETE FROM rentals WHERE id = ${id}`)
        res.send()
        
    } catch (error) {
        res.status(500).send(error.message)
    }

}

