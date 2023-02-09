export default function validateSchema(schema) {
    return (req, res, next) => {
        const validateUser = schema.validate(req.body, { abortEarly: false })
        if (validateUser.error) {
            const erros = validateUser.error.details.map((err) => {
                return err.message
            })
            return res.status(400).send(erros)
        }
        next()

    }
}