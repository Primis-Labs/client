/* eslint-disable no-unused-vars */
var axios = require('axios');
const baseURL = "https://singular.rmrk.app/api/rmrk1/account/";


function baseRequest(url){
    axios.get(url).then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}

function nftRequest(address){
    baseRequest(baseURL + "/" + address);
}

module.exports = {
    nftRequest
}