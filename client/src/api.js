const axios = require('axios')
const ax = axios.create({
    baseURL : 'http://34.87.123.182:3000'
})

module.exports = ax