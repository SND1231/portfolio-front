import axios from 'axios';

export default async function uploadFile(file){
  if(file == null){
    return null
  }

  const cloud_name = process.env.VUE_APP_CLOUD_NAME
  const data = new FormData()
  data.append('file', file)
  data.append('resource_type', 'raw')
  data.append('upload_preset', 'ramen_app')
  data.append('cloud_name', cloud_name)
  data.append("api_key", process.env.VUE_APP_CLOUDINARY_API_KEY);
  const res = await axios.post('https://api.cloudinary.com/v1_1/' + cloud_name +'/raw/upload', data)
  console.log(res.data.url)
  return res.data.url 
}
