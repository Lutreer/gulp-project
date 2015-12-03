# 使用gulp管理项目

####gulpfile.js部分代码如下，可以查看项目中依赖的gulp 插件
```javascript
"devDependencies": {
    "gulp": "^3.9.0",
    "browser-sync": "^2.10.0",
    "gulp-autoprefixer": "^3.1.0",
    "gulp-clean": "^0.3.1",
    "gulp-concat": "^2.6.0",
    "gulp-html-minifier": "^0.1.6",
    "gulp-if": "^2.0.0",
    "gulp-minify-css": "^1.2.1",
    "gulp-sass": "^2.1.0",
    "gulp-uglify": "^1.5.1",
    "gulp-useref": "^3.0.3"
  }
```

####gulp help
`gulp help`命令可以查看本项目中gulp任务的使用说明。

####关于gulp-sass的一些问题
由于node的版本原因，在下载或使用gulp-sass时如果出现node-sass的相关报错，请试图更新本地的node-sass，或者自行下载node-sass并拷贝到本项目的node_modules中在安装gulp-sass。

>gulp-ruby-sass：依赖本地的ruby环境；  
>gulp-sass:依赖node环境中的node-sass。

####node server和browser-sync
`app/server.js`：在该文件目录下通过`node server.js`命令，可启动一个简单的本地node http服务器，当然gulp插件中的browser-sync也可以启动一个本地服务器，并实时将改动的文件跟新到浏览器中。




