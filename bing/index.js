const { translate } = require('bing-translate-api');

module.exports = (ctx) => {
  const config = []
  const register = () => {
    ctx.log('必应翻译注册成功');
  }
  const translate_bing = (translate_en_str) => {
    translate(translate_en_str, null, 'zh-Hans').then(res => {
      ctx.log(res.translation);
      ctx.finishTranslate(res.translation);
    }).catch(err => {
      ctx.log(err);
    });
  }
  return {
    TranslateName: "bing",
    TranslateZhName: "必应翻译",
    TranslateConfig: config,
    TranslateRegister: register,
    TranslateFunction: translate_bing
  }
}
