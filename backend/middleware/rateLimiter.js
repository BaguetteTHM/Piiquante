const rateLimit = require('express-rate-limit');

// limiter pour les routes post user
exports.limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 100 essais max par id par 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});