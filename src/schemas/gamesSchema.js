import joi from 'joi'

export const gamesSchema = joi.object({    
    name: joi.string().pattern(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().required(),
    pricePerDay: joi.number().precision(2).required(),
}).allow("name", "image", "stockTotal", "pricePerDay")