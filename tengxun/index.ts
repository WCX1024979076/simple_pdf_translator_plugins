const Tencent = require('@opentranslate/tencent')

module.exports = (ctx) => {
  let userConfig = ctx.getConfig('tengxun');
  if (!userConfig) {
	ctx.setConfig("tengxun", {
	  "secretId": "",
	  "secretKey": ""
    })
	userConfig = ctx.getConfig('tengxun');
  }
  const config = [
    {
      name: 'secretId',
      type: 'input',
      default: userConfig.secretId || '',
      message: 'secretId不能为空',
      required: true
    },
    {
      name: 'secretKey',
      type: 'input',
      default: userConfig.secretKey || '',
      message: 'secretKey不能为空',
      required: true
    }
  ]
  const register = () => {
    ctx.log('腾讯翻译注册成功');
  }
  const translate = (translate_en_str) => {
    const tencent = new Tencent({
      config: {
        secretId: userConfig.secretId,
        secretKey: userConfig.secretKey
      }
    })
    tencent.translate(translate_en_str, "en", "zh-CN").then((data) => {
      let translate_str = "  ";
      for(let i = 0; i < data.trans.paragraphs.length; i++) {
        translate_str = translate_str + data.trans.paragraphs[i] + "\n  ";
      }
	  ctx.finishTranslate(translate_zh_str);
    }).catch((resp) => console.warn(resp));
  }
  return {
    TranslateName:"tengxun",
	TranslateZhName:"腾讯翻译",
    TranslateConfig:config,
    TranslateRegister:register,
    TranslateFunction:translate
  }
}
