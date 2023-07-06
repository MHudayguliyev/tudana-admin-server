const MainRouter = require('express').Router()
const {
    GetWhData,
    GetWhVideos, 
    GetProducts, 
    GetRecepts, 
    GetServices,
    GetStatistics,
    GetPartners,
    GetAboutus,
    SendMail
} = require('../controllers/Main')
const {CheckBody, CheckParams } = require('../scripts/helpers/SchemaValidate')
const Schemas = require("../scripts/schemas/MainSchema")

MainRouter.get('/get-wh-data', GetWhData)
MainRouter.get('/get-wh-video', GetWhVideos)
MainRouter.get('/get-products', GetProducts)
MainRouter.get('/get-recepts', GetRecepts)
MainRouter.get('/get-services', GetServices)
MainRouter.get('/get-statistics', GetStatistics)
MainRouter.get('/get-partners', GetPartners)
MainRouter.get('/get-aboutus', GetAboutus)
MainRouter.post('/send-mail', CheckBody(Schemas.SendEmailSchema), SendMail)

module.exports = MainRouter