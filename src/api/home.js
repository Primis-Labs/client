/* eslint-disable no-unused-vars */
const axios = require('axios').default;
const baseURL = 'https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=json';

async function latestNews(){
   return axios.get(baseURL);
}


module.exports = {
    latestNews
}