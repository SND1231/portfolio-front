import Axios from 'axios'

export default function createAxios(){
  var axios = Axios.create({
        baseURL: 'http://192.168.33.10:8081'
      });
  return axios;
}

