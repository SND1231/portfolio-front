import Axios from 'axios'

export default function createAxios(){
  var axios = Axios.create({
        baseURL: process.env.VUE_APP_API_ENDPOINT
      });
  return axios;
}

