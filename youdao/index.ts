const md5 = require('js-md5');
const axios = require('axios');
const CryptoJS = require('crypto-js');

module.exports = (ctx) => {
  let userConfig = ctx.getConfig('youdao');
  if (!userConfig) {
    ctx.setConfig("youdao", {
      "appKey": "",
      "secertKey": ""
    })
    userConfig = ctx.getConfig('youdao');
  }

  const info = {
    apiServer: 'https://openapi.youdao.com/api',
    from: 'en',
    to: 'zh',
    appKey: userConfig.appKey,
    secertKey: userConfig.secertKey
  };

  const config = [
    {
      name: 'appKey',
      type: 'input',
      default: userConfig.appKey || '',
      message: 'appKey不能为空',
      required: true
    },
    {
      name: 'secertKey',
      type: 'input',
      default: userConfig.secertKey || '',
      message: 'secertKey不能为空',
      required: true
    },
  ]

  const register = () => {
    ctx.log('有道翻译注册成功');
  }

  const translate = (q) => {
    const { from, to, appKey, apiServer, secertKey} = info;
    let salt = Date.parse(new Date()) / 1000;
    let curtime = Math.round(new Date().getTime() / 1000);
    let str1 = "";
    if (q.length <= 20)
      str1 = appKey + q + salt + curtime + secertKey;
    else
      str1 = appKey + q.substr(0, 10) + q.length + q.substr(q.length - 10, 10) + salt + curtime + secertKey;
    let sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
    let url = apiServer;
    axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        q: q,
        appKey: appKey,
        salt: salt,
        from: from,
        to: to,
        sign: sign,
        signType: "v3",
        curtime: curtime,
      },
      method: 'POST',
      url: url,
    },
    ).then((data) => {
      let translate_str = "  " + data.data.translation;
      translate_str = translate_str.replace(/[\r\n]/g, "\r\n  ");
      ctx.finishTranslate(translate_str);
    }).catch((resp) => console.warn(resp));
  }

  return {
    TranslateName: "youdao",
    TranslateZhName: "有道翻译",
    TranslateConfig: config,
    TranslateRegister: register,
    TranslateFunction: translate
  }
}
