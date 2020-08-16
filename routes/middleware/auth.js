const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    console.log(token);
    if (token == null) return res.status(401).json({
        response: "Token not found."
    })

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, user) => {
        if (error) return res.status(403).json({
            response: "Token invalid."
        })
        req.user = user;
        next();
    })
}

module.exports = authMiddleware;