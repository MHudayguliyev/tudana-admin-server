const express = require('express')
const http = require('http')
const createError = require('http-errors');
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const ENV = require('./src/config')
const next = require('next');

const PORT = ENV.NODE_PORT || 8081
const app = express()


/// IMAGE/MP4 MIDDLEWARES
app.use('/product', express.static(`${ENV.MEDIA_PATH}/products`));
app.use('/partner', express.static(`${ENV.MEDIA_PATH}/partners`));
app.use('/whouse', express.static(`${ENV.MEDIA_PATH}/whouses`));
app.use('/recept', express.static(`${ENV.MEDIA_PATH}/recepts`));
app.use('/video', express.static(`${ENV.MEDIA_PATH}/videos`));


app.disable('x-powered-by');

const allowedOrigins = [
    "http://localhost:3000",
    'http://localhost:5173',
    "http://192.168.5.99:5173",
    'http://localhost:5174',
    "http://192.168.5.99:5174"
]

app.use(cors({
    origin(origin, cb){
        if(!origin) return cb(null, true)
        if(allowedOrigins.indexOf(origin) === -1){
            const message = 'The CORS policy for this site does not allow access from the specified Origin.';
            return cb(new Error(message), false)
        }
        return cb(null, true);
    },
    credentials: false
}))
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'"],
      },
    },
}));

// IMPORT ROUTES
const AdminRouter = require('./src/routes/AdminRoute')
const AuthRouter = require('./src/routes/AuthRoute')
const MainRouter = require('./src/routes/MainRoute')

//// USE ROUTES
app.use('/api/tudana/auth', AuthRouter)
app.use('/api/tudana/admin', AdminRouter)
app.use('/api/tudana/main', MainRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

const server = http.createServer(app)
server.listen(PORT, () => console.log(`Server runs on port ${PORT}`))

