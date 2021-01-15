import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const isEmpty = function(target) {
    return target.length > 0 ? false : true;
}

const isLogin = function() {
    return !!(this.$cookies.get('token') && this.$session.get('refreshToken'));
}  

const hashPassword = function(password) {
    return bcrypt.hashSync(password, 10)
}

const checkEmail = function(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const getInfoFromToken = function(token) {
    const result = jwt.verify(token, process.env.VUE_APP_JWT_SECRET);
    return result;
}

const modifyDate = function({ originDate=new Date(Date.now()), years=0, months=0, dates=0, hours=0, minutes=0, seconds=0 }) {
    const modifiedDate = new Date(originDate.getFullYear() + years, originDate.getMonth() + months, originDate.getDate() + dates, originDate.getHours() + hours, originDate.getMinutes() + minutes, originDate.getSeconds() + seconds, originDate.getMilliseconds());
    return modifiedDate;
}

export { isEmpty, isLogin, hashPassword, checkEmail, getInfoFromToken, modifyDate }