export default function getCookieDataByKey(key){
  var cookies = document.cookie;
  var cookiesArray = cookies.split(';');
  for(var c of cookiesArray){
    var cArray = c.split('=');
    if( cArray[0].match(key) ){  // keyになる文字列が正規表現にマッチしたら
      return cArray[1]
    }
  }
}
