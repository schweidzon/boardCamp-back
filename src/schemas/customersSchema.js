import joi from 'joi'

export const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().length(11).required(),
    cpf: joi.string().length(11).required(),
    birthday: joi.string().pattern(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).required()
}).allow("id", "name", "phone", "cpf", "birthday")

//name: joi.string().pattern(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).required(),