const path = require("path"); //Node.js内置模块
module.exports = {
    entry: './index.js', //配置入口文件
    output: {
        path: path.resolve(__dirname, './'), //输出路径，__dirname：当前文件所在路径
        filename: 'google.js', //输出文件
		library: 'app',
		libraryTarget: 'commonjs',
    },
	target: 'node'
}
