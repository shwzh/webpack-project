"watch": "webpack --watch",  这种监听方式 构建完成之后 需要手动刷新浏览器

"dev": "webpack-dev-server --open"   --open 是自动打开浏览器

命令配置
 "build": "webpack --config webpack.prod.js",
 "dev": "webpack-dev-server --config webpack.dev.js --open"
可以通过 --config 来指定运行的文件


npm i mini-css-extract-plugin -D

npm i webpack-dev-server -D

MiniCssExtractPlugin.loader 和 style-loader 冲突 两者不可并用 

MiniCssExtractPlugin.loader 是将所有的css打包程文件的格式插入 head标签中

style-loader 是将css 插入 head 标签中

代码压缩   html js css 压缩

js: uglifyjs-webpack-plugin 这是webpack中内置的压缩  js文件会被自动压缩  也可单独安装下载 进行一些参数的设置

css: optimize-css-assets-webpack-plugin && cssnano(匹配css文件)

html: html-webpack-plugin  
