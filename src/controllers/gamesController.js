import {db} from '../config/database.js'

export async function getAllGames(req, res) {
    try {
        const games = await db.query("SELECT * FROM GAMES")
        res.send(games.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function insertNewGame(req, res) {
    const {name, image, stockTotal, pricePerDay} = req.body
    console.log(name)
    
    try {

        const insertGame = await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ('${name}', '${image}', '${stockTotal}', '${pricePerDay}')`)
        res.sendStatus(201)
        
    } catch (error) {
        res.status(500).send(error.message)
    }

}