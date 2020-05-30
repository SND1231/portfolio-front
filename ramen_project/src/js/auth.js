import createAxios from '@/js/createAxios.js'


export default async function loginUser(email, password){
  var axios = createAxios();
  let success = true;
  let message = "";
  await axios.post('/v1/login', {email: email, password: password}
  ).then(function (response) {
    // cookieとしてトークンを付与
    document.cookie = 'token=' + response.data.token;
    document.cookie = 'user_id=' + response.data.id;
    document.cookie = 'authenticated=True';
    window.location.href = "/";
  }).catch(err => {
    console.log('err:', err.response.data);
    success = false;
    message = err.response.data;
  });
  var data = {"success":success, "message":message}
  return data;
}

