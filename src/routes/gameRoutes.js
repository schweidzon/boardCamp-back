import {Router} from 'express'

const gameRoutes = Router()

gameRoutes.get("/games", getAllGames)
gameRoutes.post("/games", insertNewGame)

export default gameRoutes