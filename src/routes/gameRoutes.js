import {Router} from 'express'
import {getAllGames, insertNewGame} from '../controllers/gamesController.js'


const gameRoutes = Router()

gameRoutes.get("/games", getAllGames)
gameRoutes.post("/games", insertNewGame)

export default gameRoutes