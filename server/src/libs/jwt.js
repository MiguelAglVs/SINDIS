const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");

function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
module.exports = { createAccessToken };
