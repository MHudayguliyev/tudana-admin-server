require('dotenv').config()

const ENV = {
    USER: process.env.USER,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    DATABASE: process.env.DATABASE,
    PASSWORD: process.env.PASSWORD,
    NODE_PORT: process.env.NODE_PORT,
    INIT_URL: process.env.INIT_URL,
    ACCESS_KEY: process.env.ACCESS_KEY,
    REFRESH_KEY: process.env.REFRESH_KEY,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
    MEDIA_PATH: process.env.MEDIA_PATH
}

module.exports = ENV