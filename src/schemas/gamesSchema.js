import joi from 'joi'

export const gamesSchema = joi.object({    
    name: joi.string().pattern(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ1234567890 ]+$/).required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().min(0).required(),
    pricePerDay: joi.number().min(0).precision(2).required(),
}).allow("name", "image", "stockTotal", "pricePerDay")