import {db} from '../config/database.js'

export async function getAllGames(req, res) {
    const {name} = req.query
    const {offset, limit} = req.query
    
    
    try {
        if(name) {
       
            const gamesFilteres = await db.query(`SELECT * FROM games WHERE name ILIKE '${name}%'`)
            return res.send(gamesFilteres.rows)
        }
        if(offset) {
            const games = await db.query(`SELECT * FROM games OFFSET ${offset}`)
            return res.send(games.rows)
        }
        if(limit) {
            const games = await db.query(`SELECT * FROM games LIMIT ${offset}`)
            return res.send(games.rows)

        }
        if(offset && limit) {
            const games = await db.query(`SELECT * FROM games LIMIT ${limit} OFFSET ${offset}`)
            return res.send(games.rows)

        }
        const games = await db.query("SELECT * FROM games")
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