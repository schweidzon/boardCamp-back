import joi from 'joi'

const rentalSchema = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    rentDate: joi.string().pattern(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).required(),   
    daysRented: joi.number().required(),            
    returnDate: joi.valid(null, joi.string().pattern(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)).required(),       
    originalPrice: joi.number().required(),
    delayFee: joi.valid(null, joi.number()).required()      

})