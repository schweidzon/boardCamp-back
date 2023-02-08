import {Router} from 'express'
import {getAllGames, insertNewGame} from '../controllers/gamesController.js'
import { checkGameValues } from '../middlewares/gamesMiddlewares.js'
import validateSchema from '../middlewares/validateSchemas.js'
import { gamesSchema } from '../schemas/gamesSchema.js'
 


const gameRoutes = Router()

gameRoutes.get("/games",getAllGames)
gameRoutes.post("/games", checkGameValues,validateSchema(gamesSchema), insertNewGame)

export default gameRoutes