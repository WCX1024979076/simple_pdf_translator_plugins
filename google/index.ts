const axios_proxy = require('axios-https-proxy-fix')

module.exports = (ctx) => {
  let userConfig = ctx.getConfig('google');
  if (!userConfig) {
	ctx.setConfig("google", {
	  "proxyip": "",
	  "proxyport": ""
    })
	userConfig = ctx.getConfig('google');
  }
  const info = {
    apiServer: 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh&dt=t&q=',
  };
  const config = [
    {
      name: 'proxyip',
      type: 'input',
      default: userConfig.proxyip || '',
      message: '代理ip不能为空',
      required: true
    },
    {
      name: 'proxyport',
      type: 'input',
      default: userConfig.proxyport || '',
      message: '代理端口不能为空',
      required: true
    },
  ]
  
  const register = () => {
    ctx.log('谷歌翻译注册成功');
  }
  
  const translate = (q) => {
  const { apiServer } = info;
  let url = apiServer.concat(encodeURIComponent(q));
  axios_proxy({
        headers:{
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)   Chrome/108.0.0.0 Safari/537.36',
          "content-type": "application/x-www-form-urlencoded",
          "Accept": "application/json, text/plain, */*",
          'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        url: url,
        proxy: {
          protocol: 'http',
          host: userConfig.proxyip,
          port: parseInt(userConfig.proxyport),
        },
      },
    ).then((data) => {
      let translate_str = "  ";
      for(let i = 0; i < data.data[0].length; i++) {
        translate_str = translate_str + data.data[0][i][0] + "  ";
      }
      finish_translate(translate_str);
    }).catch((resp) => console.warn(resp));
  }
  
  return {
    TranslateName:"google",
	TranslateZhName:"谷歌翻译",
    TranslateConfig:config,
    TranslateRegister:register,
    TranslateFunction:translate
  }
}
