const JWT = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        JWT.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) return res.status(403).json("Token is invalid")
            req.user = user
            next()
        })
    } else {
        return res.status(401).json("You are not authorized")
    }
}

const tokenAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json("Not allowed")
        }
    })
}

const adminAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json("Not allowed")
        }
    })
}

module.exports = {verifyToken, tokenAuthorization, adminAuthorization}