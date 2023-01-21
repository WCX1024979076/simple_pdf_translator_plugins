const md5 = require('js-md5');
const axios = require('axios');

function jsonpCallback(response){
  if(response && response.trans_result && response.trans_result.length){
    let translate_str = "  ";
    for(let i = 0; i < response.trans_result.length; i++) {
      let res = response.trans_result[i].dst;
      translate_str = translate_str + res + "\n  ";
    }
    return translate_str;
  }
};

module.exports = (ctx) => {
  let userConfig = ctx.getConfig('baidu');
  if (!userConfig) {
	ctx.setConfig("baidu", {
	  "appid": ""
    })
	userConfig = ctx.getConfig('baidu');
  }
  
  const info = {
    apiServer: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
    from: 'en',
    to: 'zh',
    appid: userConfig.appid,
  };

  const config = [
    {
      name: 'appid',
      type: 'input',
      default: userConfig.appid || '',
      message: 'appid不能为空',
      required: true
    }
  ]
  
  const register = () => {
    ctx.log('百度翻译注册成功');
  }
  
  const translate = (translate_en_str) => {
    const { from, to, appid, apiServer } = info;
	const salt = Date.parse(new Date()) / 1000;
	let params = {
      q,
      from,
      to,
      appid,
      salt,
      sign: md5(appid + q + salt + 'kPdITme1hd064yblpbid'),
    };
    let url = apiServer;
    axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        q: q,
        from: from,
        to: to,
        appid: appid,
        salt: salt,
        sign: params.sign,
      },
      method: 'POST',
      url: url,
    }).then((data) => {
      ctx.finishTranslate(jsonpCallback(data.data));
    }).catch((resp) => console.warn(resp));
  }
  
  return {
    TranslateName:"baidu",
	TranslateZhName:"百度翻译",
    TranslateConfig:config,
    TranslateRegister:register,
    TranslateFunction:translate
  }
}
