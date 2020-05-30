import axios from 'axios';

export default async function uploadFile(file){
  if(file == null){
    return null
  }

  const data = new FormData()
  data.append('file', file)
  data.append('resource_type', 'raw')
  data.append('upload_preset', 'ramen_app')
  data.append('cloud_name', 'dxo10noyu')
  data.append("api_key", "345763872816657");
  const res = await axios.post('https://api.cloudinary.com/v1_1/dxo10noyu/raw/upload', data)
  console.log(res.data.url)
  return res.data.url 
}
