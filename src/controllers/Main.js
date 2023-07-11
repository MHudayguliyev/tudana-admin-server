const database = require('../db')
const {SendEmail} = require('../scripts/helpers/SendMail')
const status = require('../scripts/utils/status')

const GetWhData = async (req, res) => {
    const queryText = `SELECT warehouse_guid,warehouse_name,image_guid,image_name 
	FROM tbl_warehouses wh JOIN tbl_images i on wh.warehouse_guid = i.parent_guid`
    try {
        const {rows} = await database.query(queryText, [])
        return res.status(status.success).send(rows)
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}
const GetWhVideos = async (req, res) => {
    const queryText = `SELECT concat(video_name, video_format) as name FROM tbl_videos`
    try {
        const {rows} = await database.query(queryText, [])
        return res.status(status.success).send(rows[0])
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}
const GetProducts = async (req, res) => {
    const queryText = `SELECT product_guid,image_guid,image_name 
                       FROM tbl_products p
	                   JOIN tbl_images i on p.product_guid = i.parent_guid`
    try {
        const {rows} = await database.query(queryText, [])
        return res.status(status.success).send(rows)
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}
const GetRecepts = async (req, res) => {
    const queryText = `	
    SELECT recept_guid, image_guid,
	recepts_object as recepts, prepare_object as preparation,
	image_name FROM tbl_recepts r
	JOIN tbl_images i on r.recept_guid = i.parent_guid`
    try {
        const {rows} = await database.query(queryText, [])
        return res.status(status.success).send(rows)
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}
const GetServices = async(req, res) => {
    const queryText = `SELECT * FROM tbl_services`
    try {
        const {rows} = await database.query(queryText, [])
        return res.status(status.success).send(rows)
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}
const GetStatistics = async (req, res) => {
    const queryText = `SELECT client_count, delivery_count, rating FROM tbl_statistics`
    try {
        const {rows} = await database.query(queryText, [])
        return res.status(status.success).send(rows[0])
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}

const GetPartners = async (req, res) => {
    const queryText = `	
    SELECT partner_guid,partner_name,image_guid,image_name 
	FROM tbl_partners p
	JOIN tbl_images i on p.partner_guid = i.parent_guid`

    try {
        const {rows} = await database.query(queryText, [])
        return res.status(status.success).send(rows)
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}
const GetAboutus = async(req, res) => {
    const queryText =`SELECT json_build_object('tm', text_tm, 'ru',text_ru, 'en', text_en) as row FROM tbl_aboutus` 
    try {
        const {rows} = await database.query(queryText, [])
        console.log('rows', rows)
        return res.status(status.success).send(rows)
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}
// const Get 
const SendMail = async (req, res) => {
    const {phone,name,feedback} = req.body
    try {
      const response = await SendEmail(phone,name,feedback)
      console.log('response', response)
      if(response.status === 'Bad'){
        return res.status(status.bad).send('Unknown error in sendEmail.')
      }else if(response.status === 'Sent'){
        return res.status(status.success).send({status: status.success, message: 'Successfully sent.'})
      }
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}


module.exports = {
    GetWhData,
    GetProducts,
    GetWhVideos,
    GetRecepts,
    GetServices,
    GetStatistics,
    GetPartners,
    GetAboutus,
    SendMail
}