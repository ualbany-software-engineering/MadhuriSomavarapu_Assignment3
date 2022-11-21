const jsonwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
    try {
        
        const token  = req.headers.authorization.split(" ")[1]
        const decode = jsonwt.verify(token, "secretValue")

        req.user = decode
        next()
    } catch (error) {
        res.json({
            messsage : "Authentication failed"
        })
    }
}

module.exports = authenticate