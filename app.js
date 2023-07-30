const express = require('express')
const http = require('http')
const createError = require('http-errors');
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const ENV = require('./src/config')

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
const MainRouter = require('./src/routes/MainRoute');
const Authenticate = require('./src/scripts/helpers/Authenticate');

//// USE ROUTES
app.use('/api/tudana/auth', AuthRouter)
app.use('/api/tudana/admin', AdminRouter)
app.use('/api/tudana/main', MainRouter)

app.get('/api/tudana/users', Authenticate,  (req, res) => {
    const data = [{"id":1,"first_name":"Martynne","last_name":"Djekic","email":"mdjekic0@tuttocitta.it"},
    {"id":2,"first_name":"Susan","last_name":"Cane","email":"scane1@a8.net"},
    {"id":3,"first_name":"Cassius","last_name":"Graser","email":"cgraser2@diigo.com"},
    {"id":4,"first_name":"Drusi","last_name":"Allmond","email":"dallmond3@webnode.com"},
    {"id":5,"first_name":"Josepha","last_name":"Cathery","email":"jcathery4@goo.ne.jp"},
    {"id":6,"first_name":"Felic","last_name":"Gisbourn","email":"fgisbourn5@tinyurl.com"},
    {"id":7,"first_name":"Madelena","last_name":"Cawthery","email":"mcawthery6@mediafire.com"},
    {"id":8,"first_name":"Ephrayim","last_name":"Worrill","email":"eworrill7@techcrunch.com"},
    {"id":9,"first_name":"Jenica","last_name":"Lambin","email":"jlambin8@prweb.com"},
    {"id":10,"first_name":"Elfrida","last_name":"O'Fergus","email":"eofergus9@addtoany.com"}]
    return res.send(data)
})

app.get('/api/tudana/users/:id',  Authenticate, (req, res) => {
    const data = [{"id":1,"first_name":"Martynne","last_name":"Djekic","email":"mdjekic0@tuttocitta.it"},
    {"id":2,"first_name":"Susan","last_name":"Cane","email":"scane1@a8.net"},
    {"id":3,"first_name":"Cassius","last_name":"Graser","email":"cgraser2@diigo.com"},
    {"id":4,"first_name":"Drusi","last_name":"Allmond","email":"dallmond3@webnode.com"},
    {"id":5,"first_name":"Josepha","last_name":"Cathery","email":"jcathery4@goo.ne.jp"},
    {"id":6,"first_name":"Felic","last_name":"Gisbourn","email":"fgisbourn5@tinyurl.com"},
    {"id":7,"first_name":"Madelena","last_name":"Cawthery","email":"mcawthery6@mediafire.com"},
    {"id":8,"first_name":"Ephrayim","last_name":"Worrill","email":"eworrill7@techcrunch.com"},
    {"id":9,"first_name":"Jenica","last_name":"Lambin","email":"jlambin8@prweb.com"},
    {"id":10,"first_name":"Elfrida","last_name":"O'Fergus","email":"eofergus9@addtoany.com"}]

    const found = data.find((user) => user.id === parseInt(req.params.id))
    return res.send(found)
})



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

const server = http.createServer(app)
server.listen(PORT, () => console.log(`Server runs on port ${PORT}`))

