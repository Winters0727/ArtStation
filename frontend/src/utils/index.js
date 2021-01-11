import VueCookies from 'vue-cookies'
import jwt from 'jsonwebtoken'

const isEmpty = function(target) {
    return target.length > 0 ? false : true;
}

const isLogin = function() {
    return !!(VueCookies.get('token') && localStorage.getItem('vue-session-key'));
}  

const checkEmail = function(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const getInfoFromToken = function(token) {
    const result = jwt.verify(token, process.env.VUE_APP_JWT_SECRET);
    return result
}

export { isEmpty, isLogin, checkEmail, getInfoFromToken }