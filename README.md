# PDF划词翻译插件开发

具体插件开发样例可参考目录baidu下百度翻译开发，开发完成后采用webpack打包，最后将打包好的js放到安装包内进行安装。

注意：

1、module.exports 需要导出一函数并且传入参数ctx，这里ctx即为上下文环境，由软件进行提供，内部实现了ctx.log(log:string)日志函数、ctx.getConfig(key:string)获取配置函数、ctx.setConfig(key:string,value:object)保存配置函数、ctx.finishTranslate(translatr_str:string)翻译完成回调函数。

2、module.exports 导出的函数需返回TranslateName翻译英文标注名称、TranslateZhName翻译中文名称、TranslateConfig翻译配置要求、TranslateRegister翻译注册函数、TranslateFunction翻译函数。

3、TranslateConfig翻译配置要求模板如下，前端ui会根据配置要求生成相应的输入框并保存到相应文件中。

```json
  const config = [
    {
      name: 'appid', //名称
      type: 'input', //数字
      default: userConfig.appid || '', //默认值
      message: 'appid不能为空', //提示文字
      required: true //是否必须
    },
    {
      name: 'secretkey', 
      type: 'password', //输入密钥
      default: userConfig.secretkey || '',
      message: 'secretkey不能为空',
      required: true
    }  
  ]
```

4、用户配置完成后会对插件重新加载，插件开发过程中无需考虑配置重新加载。

5、插件机制主要参考picgo的插件开发，可参考picgo的相关文章，[https://picgo.github.io/PicGo-Core-Doc/zh/dev-guide/cli.html](https://picgo.github.io/PicGo-Core-Doc/zh/dev-guide/cli.html)

6、目前插件机制依赖于软件进行下发（将插件打包进入app.asar并在运行时加载），后期考虑进行利用npm库来进行插件加载与升级。

