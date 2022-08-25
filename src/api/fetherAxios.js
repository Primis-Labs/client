/* eslint-disable no-unused-vars */
var axios = require('axios');
const baseURL = "https://singular.rmrk.app/api/rmrk1/account";

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})


async function baseRequest(url){
    await axios.get(url).then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    });
}

async function nftRequest(address){
  console.log(address);
   return await baseRequest(baseURL + "/" + address);
}

module.exports = {
    nftRequest
}