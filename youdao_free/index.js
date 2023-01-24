const axios = require('axios')

module.exports = (ctx) => {
  const info = {
    apiServer: 'https://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=',
  };
  const config = []

  const register = () => {
    ctx.log('有道翻译免费注册成功');
  }

  const translate = (q) => {
    const {
      apiServer
    } = info;
    let url = apiServer.concat(encodeURIComponent(q));
    axios({
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)   Chrome/108.0.0.0 Safari/537.36',
        "content-type": "application/x-www-form-urlencoded",
        "Accept": "application/json, text/plain, */*",
        'X-Requested-With': 'XMLHttpRequest'
      },
      method: 'POST',
      url: url
    }, ).then((data) => {
      let translate_str = "  ";
      for (let i = 0; i < data.data.translateResult.length; i++) {
        for (let j = 0; j < data.data.translateResult[i].length; j++) {
          translate_str = translate_str + data.data.translateResult[i][j].tgt + "  ";
        }
        translate_str = translate_str + "\n  ";
      }
      ctx.finishTranslate(translate_str);
    }).catch((resp) => console.warn(resp));
  }

  return {
    TranslateName: "youdao_free",
    TranslateZhName: "有道翻译免费",
    TranslateConfig: config,
    TranslateRegister: register,
    TranslateFunction: translate
  }
}