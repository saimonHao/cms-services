const jwt = require('jsonwebtoken');

const secretKey = 'cms';

const generateJwtToken = (payload) => {
    const token = "Bearer " + jwt.sign(payload, secretKey, {
        //Eg: 60, "2 days", "10h", "7d".
        expiresIn: '2 days'
    });
    return token;
}

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log("verifiy error", err.message);
            return res.status(404).send({
                data: {
                    code: 404,
                    message: "token 无效"
                }
            })
        }
        console.log("verify decoded", decoded);
        next();
    });
}

module.exports = {
    generateJwtToken,
    verifyToken
}