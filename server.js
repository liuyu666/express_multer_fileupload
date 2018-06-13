// 引入模块
let express = require("express");
let multer = require("multer");
// 中间件，网上搬砖过来的
var storage = multer.diskStorage({
    // 文件存储位置
    destination:function(req,file,cb){
        cb(null,'./files')
    },
    // 存储的文件名
    //给上传文件重命名，获取添加后缀名，同样copy。   获取不到后缀？？
    filename:function(req,file,cb){
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
//添加配置文件到muler对象。
var upload = multer({storage:storage})



// 第二部分创建服务器
var app = express();

// 将网页呈现
app.get("/form.html",function(req,res){
    // 绝对路径${__dirname}
    res.sendFile(`${__dirname}/form.html`);
})
// 上传
app.post("/upload",upload.single("myfile"),function (req,res) {
    res.send("ok");
    //upload.single上传单个文件，upload.array上传多个文件，详情百度
    // myfile这个文件名要跟form.html中的name一致
})

app.listen(9000,"127.0.0.1",function(){
    console.log("running")
})