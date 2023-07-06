const database = require("../../db")

const GetUser = (getUnConfirmedUser = false) => {
    const userConfirmPart = getUnConfirmedUser ? ` AND NOT is_user_confirm` : '' 
    const queryText = `
    SELECT user_guid, user_login, user_name, user_password, user_email, r.role_name,
    is_user_active, is_user_confirm, r.role_is_admin FROM tbl_users u 
    LEFT JOIN tbl_user_roles r on u.role_guid = r.role_guid 
    WHERE user_login = $1 ${userConfirmPart}`

    return queryText
}

const GetContactType = async (type) => {
    let value;
    const queryText = `select contact_type_guid from tbl_contact_type
                       where contact_type_name = $1`
    try {
        const {rows} = await database.query(queryText, [type])
        if(rows.length > 0){
            value = rows[0].contact_type_guid
        }else {
            console.log("Not found.")
        }

        return value
    } catch (error) {
        console.log(error)
        return
    }
}

module.exports = {
    GetUser,
    GetContactType
}