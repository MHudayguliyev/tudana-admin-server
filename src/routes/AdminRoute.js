const AdminRouter = require('express').Router()
const Admin = require('../controllers/Admin')
const Schemas = require("../scripts/schemas/AdminSchema")
const Authenticate = require('../scripts/helpers/Authenticate')
const {Upload, FinishUpload} = require('../scripts/helpers/upload')
const {CheckQuery, CheckParams, CheckBody} = require('../scripts/helpers/SchemaValidate')


//// GET
AdminRouter.get('/get-units', Authenticate, Admin.GetUnits)
AdminRouter.get('/get-products', Authenticate, Admin.GetProducts)

//// POSTCheckQuery(Schemas.ReceptsTable.CreateReceptSchema),
AdminRouter.post('/create-product', 
                Authenticate, CheckQuery(Schemas.ProductsTable.CreateProductSchema), Upload, FinishUpload, Admin.CreateProduct)
AdminRouter.post('/create-recept', 
                Authenticate,  Upload, FinishUpload, Admin.CreateRecept)
AdminRouter.post('/create-partner', 
                Authenticate, CheckQuery(Schemas.PartnersTable.CreatePartner), Upload, FinishUpload, Admin.CreatePartner)
AdminRouter.post('/create-whouse', 
                Authenticate, CheckQuery(Schemas.WhouseTable.CreateWhouseSchema), Upload, FinishUpload, Admin.CreateWhouse)
AdminRouter.post('/upload-video', 
                Authenticate, Upload, FinishUpload, Admin.UploadVideo)

/// PUT
AdminRouter.put('/change-statistics', 
                Authenticate, CheckBody(Schemas.StatisticsTable.UpdateStatisticsSchema), Admin.UpdateStatistics)
AdminRouter.put('/change-aboutus', 
                Authenticate, CheckBody(Schemas.AboutUsTable.UpdateAboutUs), Admin.UpdateAboutUs)
AdminRouter.put('/change-services', 
                Authenticate, CheckBody(Schemas.ServicesTable.UpdateServicesSchema), Admin.UpdateServices)
//// DELETE
AdminRouter.delete('/remove-product/:id', 
                    Authenticate, CheckParams(Schemas.ProductsTable.DeleteProductSchema), Admin.DeleteProduct)
AdminRouter.delete('/remove-video/:id', 
                    Authenticate, CheckParams(Schemas.VideosTable.DeleteVideoSchema), Admin.DeleteVideo)
AdminRouter.delete('/remove-partner/:id', 
                    Authenticate, CheckParams(Schemas.PartnersTable.DeletePartner), Admin.DeletePartner)
AdminRouter.delete('/remove-recept/:id', 
                    Authenticate, CheckParams(Schemas.ReceptsTable.DeleteReceptSchema), Admin.DeleteRecept)
AdminRouter.delete('/remove-whouse/:id', 
                    Authenticate, CheckParams(Schemas.WhouseTable.DeletWhouseSchema), Admin.DeleteWarehouse)


module.exports = AdminRouter