import { db } from "../config/database.js"

export async function checkGameValues(req, res, next) {
    const {name, image, stockTotal, pricePerDay} = req.body
   
    if(stockTotal <= 0 || pricePerDay <=0) return res.sendStatus(400)
    
   
    try {
        const gameExist = await db.query(`SELECT * FROM games WHERE name = '${name}' limit 1`)
        if(gameExist.rows[0]) return res.sendStatus(409)
        console.log('1', gameExist.rows[0])
        next()
        
    } catch (error) {
        
    }
}