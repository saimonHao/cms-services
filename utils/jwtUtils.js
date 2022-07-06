const jwt = require('jsonwebtoken');
const config = require('../config');

const generateJwtToken = (payload) => {
    const token = "Bearer " + jwt.sign(payload, config.jwtSecret, {
        //Eg: 60, "2 days", "10h", "7d".
        expiresIn: '4d'
    });
    return token;
}

const verifyToken = (token, jwtSecret) => {
    const promise = new Promise((resolve, reject) => {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  
    return promise;
  };

module.exports = {
    generateJwtToken,
    verifyToken
}