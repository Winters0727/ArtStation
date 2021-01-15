const jwt = require('jsonwebtoken');
require('dotenv').config();

// JWT 토큰 검증
const verifyToken = function(inputToken, inputRefreshToken) {
    try {
        const result = jwt.verify(inputToken, process.env.VUE_APP_JWT_SECRET); // JWT 토큰 검증에 성공하면 결과 반환
        return {"result" : result}
    } catch { // JWT 토큰 검증에 실패했다면
        try {
            const result = jwt.verify(inputRefreshToken, process.env.VUE_APP_JWT_REFRESH_SECRET); // 리프레시 토큰을 검증
            return { "result" : result }
        } catch {
            return {"tokenError" : "Unvalid token error"} // 리프레시 토큰 검증에 실패하면 문제가 있는 것
        }
    }
}

module.exports = { verifyToken }