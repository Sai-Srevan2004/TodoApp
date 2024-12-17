const jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = async (req, res, next) => {
    try {
      console.log(req.headers)
        const authorization = req.headers['authorization'];
        if (!authorization) {
            return res.json({
                success: false,
                message: "Need Authorization key in headers"
            });
        }

        const token = authorization.split(' ')[1];
        console.log("Token received:", token);

        if (!token) {
            return res.json({
                success: false,
                message: "No token provided"
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET); 
            req.user = decode; 
            next(); 
        } catch (error) {
            console.log("JWT Verification Error:", error.message);
            return res.json({
                success: false,
                message: "Invalid or expired token"
            });
        }
    } catch (error) {
        console.log("Auth Middleware Error:", error.message);
        return res.json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = { auth };
