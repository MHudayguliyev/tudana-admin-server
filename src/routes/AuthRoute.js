const AuthRouter = require('express').Router()
const Schemas = require('../scripts/schemas/AuthSchema')
const Auth = require('../controllers/Auth')
const {CheckBody} = require("../scripts/helpers/SchemaValidate")

AuthRouter.post('/login', CheckBody(Schemas.LoginSchema), Auth)

module.exports = AuthRouter