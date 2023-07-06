const status = require('../utils/status')

const CheckBody = schema => (req, res, next) => {
    const { error, value } = schema.validate(req.body)
    console.log('req.body', req.body)
    if(error){
        res.status(status.bad).json({
            error: error.details[0].message
        })
        return        
    }
    Object.assign(req.body, value)
    return next()
}
const CheckQuery = schema => (req, res, next) => {
    const { error, value } = schema.validate(req.query)
    console.log('request', typeof req.query.recepts)
    if(error){
        res.status(status.bad).json({
            error: error.details[0].message
        })
        return        
    }
    Object.assign(req.params, value)
    return next()
}

const CheckParams = schema => (req, res, next) => {
    const { error, value } = schema.validate(req.params)
    console.log(req.params)
    if(error){
        res.status(status.bad).json({
            error: error.details[0].message
        })
        return        
    }
    Object.assign(req.params, value)
    return next()
}

module.exports = {
    CheckBody,
    CheckQuery,
    CheckParams
}