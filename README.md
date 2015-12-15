## 主体目录结构

```
.
├── assets     // 项目目录
│    ├── dist          // 打包目录地址
│    └── src            // 源码目录
│    	   	├── lib            // lib文件
│    		├── common    // 通用代码
│    		├── mobile           // 移动版
│    		└── pc_r.js          // pc版
├── gulpfile.js         // gulp_task文件
├── gulpStatic.js         // gulp文件
├── gulpfile.js         // gulp文件   
└webpack.production.js       // production环境webpackpc   		
```
## 各个项目目录结构

```
.
├── pc_r     // 项目目录
│    ├── img         // 
│    ├── less    // 主体less
│    └── js            // 
│    	   	├── WebApi            // api
│    		├── components    // 通用组件
│    		├── container          // 
│    		└── store          // 
├── ChatroomContainer.js         // 主container
├── index.html         // dev html
├── pc_r.entry.js         // 入口文件  
└webpack.development.js       // dev环境webpackpc   		
```



### 依赖安装

* 首先 clone 这个代码库到本地目录中

* 再在该项目`根目录`执行
```
$ npm install
```
安装依赖
* 在 `根目录`中执行
 ```
$ gulp
```

* 在 `assets/dist 目录`中找到对应html即可


### dev

* `进入assets/srv目录`执行
```
$ gulp dev-derver
```
* 启服务，如访问pc_r项目可以通过 `http://localhost:9527/assets/src/pc_r/` 进行测试
