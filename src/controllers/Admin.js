const database = require("../db")
const Slicer = require("../scripts/utils/slicer")
const {DeleteFile} = require('../scripts/helpers/upload')
const status = require('../scripts/utils/status')

const CreateProduct = async (req, res) => {
    const {product_code,product_desc,unit_guid} = req.query
    const insertQuery = `
        WITH product_inserted AS (
            INSERT INTO tbl_products(unit_guid,product_code,product_desc)
            VALUES($1,$2,$3) RETURNING product_guid
        ),
        images_type AS (
            SELECT image_type_guid FROM tbl_images_type WHERE image_type_name = 'product'
        )
        INSERT INTO tbl_images(parent_guid,image_type_guid,image_name) 
        VALUES ${req.files?.map(item => `(
            (SELECT product_guid FROM product_inserted),(SELECT image_type_guid FROM images_type), '${item.filename}'
        )`).join(', ')}
    `
   
    try {
        const response = await database.queryTransaction([{ queryText: insertQuery, params: [
            unit_guid,
            product_code,product_desc
        ]}])

        return res.status(status.success).send({message: 'Successfully created.', status: status.success})
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}

const DeleteProduct = async (req, res) => {
    const id = req.params.id
    const deleteImage = `DELETE FROM tbl_images WHERE image_guid = $1 RETURNING parent_guid, image_name`
    const get_product_guid_query = `SELECT parent_guid FROM tbl_images 
                                    WHERE parent_guid = $1`
    try {
        const deletedResponse = await database.query(deleteImage, [id])
        const data = deletedResponse.rows[0]
        const parent_guid = data.parent_guid
        const image = data.image_name

        const getResponse = await database.query(get_product_guid_query, [parent_guid])
        console.log('response', getResponse.rows)

        if(getResponse.rows.length === 0){
            const deleteQuery = `DELETE FROM tbl_products 
                                 WHERE product_guid = $1`
            await database.query(deleteQuery, [parent_guid])
        }
        DeleteFile('products', image)
        return res.status(status.success).send({message: 'Successfully deleted.', status: status.success})
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}
 
const UploadVideo = async (req, res) => {
    const insertQuery = `
        INSERT INTO tbl_videos(video_name,video_format) 
        VALUES ${req.files?.map(item => `(
            '${item.filename}','${Slicer(item.mimetype,6,item.mimetype.length)}'
        )`).join(', ')}
    `
    try {
        const response = await database.queryTransaction([{ queryText: insertQuery, params: [] }])
        console.log(response)
        return res.status(status.success).send({message: 'Successfully created.', status: status.success})
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}

const DeleteVideo = async (req, res) => {
    const id = req.params.id // video guid
    const deleteQuery = `DELETE FROM tbl_videos WHERE video_guid = $1
                        RETURNING video_guid as id, video_name as name`
    try {
        const {rows} = await database.query(deleteQuery, [id])
        const video_data = rows[0]
        if(video_data.id && video_data.name) {
            const name = video_data.name
            DeleteFile('videos', name)
        }     
        return res.status(status.success).send({message: 'Successfully deleted.', status: status.success})
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}

const CreatePartner = async (req, res) => {
    const partner = req.query.partner
    const insertPartner = `
        WITH partner_inserted AS (
            INSERT INTO tbl_partners(partner_name) 
            VALUES ($1) RETURNING partner_guid
        ),
        images_type AS (
            SELECT image_type_guid FROM tbl_images_type WHERE image_type_name = 'partner'
        )
        INSERT INTO tbl_images(parent_guid,image_type_guid,image_name) 
        VALUES ${req.files?.map(item => `(
            (SELECT partner_guid FROM partner_inserted),(SELECT image_type_guid FROM images_type), '${item.filename}'
        )`).join(', ')}
    `

    try {
        const response = await database.queryTransaction([{ queryText: insertPartner, params:[partner] }])
        console.log(response)
        return res.status(status.success).send({message: 'Successfully created.', status: status.success})
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}

const DeletePartner = async (req, res) => {
    const id = req.params.id
    const deleteImage = `DELETE FROM tbl_images WHERE image_guid = $1 RETURNING parent_guid, image_name`
    const get_partner_guid_query = `SELECT parent_guid FROM tbl_images 
                                    WHERE parent_guid = $1`

    try {
        const deletedResponse = await database.query(deleteImage, [id])
        const data = deletedResponse.rows[0]
        const parent_guid = data.parent_guid
        const image = data.image_name

        const getResponse = await database.query(get_partner_guid_query, [parent_guid])
        if(getResponse.rows.length === 0){
            const deleteQuery = `DELETE FROM tbl_partners 
                                 WHERE partner_guid = $1`
            await database.query(deleteQuery, [parent_guid])
        }
        DeleteFile('partners', image)
        return res.status(status.success).send({message: 'Successfully deleted.', status: status.success})
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}

const CreateRecept = async (req, res) => {
    const recepts = req.query.recepts
    const prepare = req.query.prepare
    console.log("req,", req.query)
   
    const insertQuery = `
    WITH recept_inserted AS (
        INSERT INTO tbl_recepts(recepts_object,prepare_object) 
        VALUES($1,$2) RETURNING recept_guid
    ),
    images_type AS (
        SELECT image_type_guid FROM tbl_images_type WHERE image_type_name = 'recept'
    )
    INSERT INTO tbl_images(parent_guid,image_type_guid,image_name) 
    VALUES ${req.files?.map(item => `(
        (SELECT recept_guid FROM recept_inserted),(SELECT image_type_guid FROM images_type), '${item.filename}'
    )`).join(', ')}  
    `

    console.log('query', insertQuery)
    try {
        const response = await database.queryTransaction([{ queryText: insertQuery, params: [recepts,prepare] }])
        console.log(response)
        return res.status(status.success).send({message: 'Successfully created.', status: status.success})
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}

const DeleteRecept = async (req, res) => {
    const id = req.params.id 
    const deleteImage = `DELETE FROM tbl_images WHERE image_guid = $1 RETURNING parent_guid, image_name`
    const get_recept_guid_query = `SELECT parent_guid FROM tbl_images 
                                    WHERE parent_guid = $1`

    try {
        const deletedResponse = await database.query(deleteImage, [id])
        const data = deletedResponse.rows[0]
        const parent_guid = data.parent_guid
        const image = data.image_name

        const getResponse = await database.query(get_recept_guid_query, [parent_guid])
        if(getResponse.rows.length === 0){
            const deleteQuery = `DELETE FROM tbl_recepts 
                                 WHERE recept_guid = $1`
            await database.query(deleteQuery, [parent_guid])
        }
        DeleteFile('recepts', image)
        return res.status(status.success).send({message: 'Successfully deleted.', status: status.success})
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}

const CreateWhouse = async (req, res) => {
    const {whouse} = req.query
    const insertQuery = `
        WITH whouse_inserted AS (
            INSERT INTO tbl_warehouses(warehouse_name)
            VALUES($1) RETURNING warehouse_guid
        ),
        images_type AS (
            SELECT image_type_guid FROM tbl_images_type WHERE image_type_name = 'warehouse'
        )
        INSERT INTO tbl_images(parent_guid,image_type_guid,image_name) 
        VALUES ${req.files?.map(item => `(
            (SELECT warehouse_guid FROM whouse_inserted),(SELECT image_type_guid FROM images_type), '${item.filename}'
        )`).join(', ')}
    `
    try {
        const response = await database.queryTransaction([{ queryText: insertQuery, params: [whouse] }])
        console.log(response)
        return res.status(status.success).send({message: 'Successfully created.', status: status.success})
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}

const DeleteWarehouse = async (req, res) => {
    const id = req.params.id 
    const deleteImage = `DELETE FROM tbl_images WHERE image_guid = $1 RETURNING parent_guid, image_name`
    const get_wh_guid_query = `SELECT parent_guid FROM tbl_images 
                               WHERE parent_guid = $1`

    try {
        const deletedResponse = await database.query(deleteImage, [id])
        const data = deletedResponse.rows[0]
        const parent_guid = data.parent_guid
        const image = data.image_name

        const getResponse = await database.query(get_wh_guid_query, [parent_guid])
        if(getResponse.rows.length === 0){
            const deleteQuery = `DELETE FROM tbl_warehouses 
                                 WHERE warehouse_guid = $1`
            await database.query(deleteQuery, [parent_guid])
        }
        DeleteFile('whouses', image)
        return res.status(status.success).send({message: 'Successfully deleted.', status: status.success})
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}

const UpdateStatistics = async(req, res) => {
    let {client_count, delivery_count, rating} = req.body
    client_count = client_count !== '' ? client_count : 0
    delivery_count = delivery_count !== ''? delivery_count : 0
    rating = rating !== '' ? rating : 0
    const casePart = `
        SET client_count = (
            CASE WHEN ${client_count===0 ? null : client_count} IS NULL THEN (select client_count from tbl_statistics) ELSE ${client_count} END
        ),
        delivery_count = (
            CASE WHEN ${delivery_count===0?null : delivery_count} IS NULL THEN (select delivery_count from tbl_statistics) ELSE ${delivery_count} END
        ),
        rating = (
            CASE WHEN ${rating===0?null : rating} IS NULL THEN (select rating from tbl_statistics) ELSE ${rating} END
        )
    `
    const updateQuery =`UPDATE tbl_statistics ${casePart}`
    try {
        await database.query(updateQuery, [])
        return res.status(status.success).send({message: 'Successfully updated.', status: status.success})
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}

const UpdateServices = async(req, res) => {
    const {bq_ord_number, td_ord_number, fback_number} = req.body


    const initUpdate = `UPDATE tbl_services SET service_contact=`
    const wherePart = ` WHERE service_type= `
    const updBq = `${initUpdate}'${bq_ord_number}' ${wherePart} 'bouquet_ord'`
    const updTd = `${initUpdate}'${td_ord_number}' ${wherePart} 'straw_ord'`
    const updFback =  `${initUpdate}'${fback_number}' ${wherePart} 'contact'`
    const updateQuery = bq_ord_number&&!td_ord_number&&!fback_number ?  updBq: 
                        td_ord_number&&!bq_ord_number&&!fback_number ?  updTd: 
                        fback_number&&!bq_ord_number&&!td_ord_number ? updFback: 

                        bq_ord_number&&td_ord_number&&!fback_number ? 
                        `WITH updated AS (
                            ${updBq}
                        )
                        ${updTd}
                        `:
                        td_ord_number&&fback_number&&!bq_ord_number ? 
                        `WITH updated AS (
                            ${updTd}
                        )
                        ${updFback}
                        ` : 
                        fback_number&&bq_ord_number&&!td_ord_number ? 
                        `WITH updated AS (
                            ${updFback}
                        )
                        ${updBq}
                        ` : 
                        bq_ord_number&&td_ord_number&&fback_number ? 
                        `WITH bouquet_updated AS (
                            ${updBq}
                        ),
                        tudana_updated AS (
                            ${updTd}
                        )
                        ${updFback}
                        `: '' 

    try {
        await database.query(updateQuery, [])
        return res.status(status.success).send({message: 'Successfully updated.', status: status.success})
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}

const UpdateAboutUs = async(req, res) => {
    const {tm, ru, en} = req.body
    const updateQuery = `UPDATE tbl_aboutus SET text_tm = $1,text_ru = $2,text_en = $3`
    try {
        await database.query(updateQuery, [tm, en, ru])
        return res.status(status.success).send({message: 'Successfully updated.', status: status.success})
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}

const GetUnits = async (req, res) => {
    const queryText = `SELECT * FROM tbl_units`
    try {
        const {rows} = await database.query(queryText, [])
        return res.status(status.success).send(rows)
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}

const GetProducts = async(req, res) => {
    const queryText = `
    SELECT product_guid,product_code,
	image_guid,image_name,
	product_desc,u.unit_name
    FROM tbl_products p
	JOIN tbl_images i on p.product_guid = i.parent_guid
	LEFT JOIN tbl_units u on u.unit_guid = p.unit_guid`

    try {
        const {rows} = await database.query(queryText, [])
        return res.status(status.success).send(rows)
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}


const moduleExports={
    /// POST/DELETE
    CreateProduct,
    DeleteProduct,
    UploadVideo,
    DeleteVideo,
    CreatePartner,
    DeletePartner,
    CreateRecept,
    DeleteRecept,
    CreateWhouse,
    DeleteWarehouse,
    UpdateStatistics,
    UpdateServices,
    UpdateAboutUs,
    /// GET
    GetUnits,
    GetProducts
}

module.exports = moduleExports