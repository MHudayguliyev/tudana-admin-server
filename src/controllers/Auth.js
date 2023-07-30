const database = require('../db')
const status = require('../scripts/utils/status')
const AuthHelper = require('../scripts/helpers/AuthHelper')

const Login = async (req, res) => {
    const {username, password} = req.body
    const get_user = `SELECT * FROM tbl_users WHERE user_name = $1`

    try {
        const data = await database.query(get_user, [username])
        if(!data.rows.length){
            return res.status(status.notfound).send('No user with this username address.')
        } 

        const user = data.rows[0]
        const databasePassword = user.user_password
        const isPasswordSame = await AuthHelper.ComparePassword(databasePassword,password)
        if(!isPasswordSame){
            return res.status(status.unauthorized).send("Password is incorrect.")
        }

        const access_token = await AuthHelper.GenerateAccessToken(user)
        const refresh_token = await AuthHelper.GenerateRefreshToken(user)
        delete user.user_password

        const response = {
            status: status.success,
            data: user,
            access_token,
            refresh_token,
            message: 'User successfully logged in.',
        }
        console.log('response', response)

        return res.status(status.success).send(response)
    } catch (error) {
        console.log(error)
        return res.status(status.error).send('Unknown error occured.')
    }
}

module.exports = Login