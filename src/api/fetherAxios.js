/* eslint-disable no-unused-vars */
var axios = require('axios');

function request(url){
    axios.get(url).then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}
module.exports = {
    request
}