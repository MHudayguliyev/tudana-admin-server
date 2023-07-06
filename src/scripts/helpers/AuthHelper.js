const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const ENV = require("../../config");

const ComparePassword = async (prevPass, currPass) => {
    return bcrypt.compareSync(currPass, prevPass)
}

const GenerateAccessToken = async (data) => {
    return jwt.sign(data, ENV.ACCESS_KEY, { expiresIn: "30d" });
};
  
const GenerateRefreshToken = async (data) => {
    return jwt.sign(data, ENV.REFRESH_KEY, { expiresIn: "30d" });
};

const VerifyRefreshToken = async (token) => {
    try {
      return jwt.verify(token, ENV.REFRESH_KEY, async (err, decoded) => {
        if (err) {
          return { status: "Unauthorized" };
        }
        const access_token = await GenerateAccessToken({
          user_guid: decoded.user_guid,
        });
        delete decoded.user_password;
        return { status: "Verified", data: { access_token, user: decoded } };
      });
    } catch (error) {
      console.log("ERROR in VerifyRefreshToken: ", error);
      return { status: "Bad" };
    }
};

const HashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hashSync(password, salt)
}

const GeneratePinCode = () => {
    return Math.floor(Math.random() * (99999 - 10000)) + 10000
}

module.exports = {
    ComparePassword,
    GenerateAccessToken,
    GenerateRefreshToken,
    VerifyRefreshToken,
    HashPassword,
    GeneratePinCode
}

