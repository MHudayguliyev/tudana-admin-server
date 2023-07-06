const rateLimit = require("express-rate-limit");
const MemeoryStore = require('express-rate-limit').MemoryStore

const RateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, //5 minutes
    max: 20,
    message: 'Siz 5 minutda 20 haýyşdan gecdiňiz, soňrak synanşyň', /// yada 5 min-den son synanys
    store: new MemeoryStore(),
    headers: true,
});


module.exports = RateLimiter