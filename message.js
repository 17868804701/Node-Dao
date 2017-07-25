/**
 * Created by 黄森 on 2017/7/24.
 */
var express = require('express');
var app = express();
var db = require('./model/db.js');
var formidable = require('formidable');

//设置模板引擎
app.set("view engine", "ejs");

app.use(express.static('./public'));

app.get('/', function (req, res, next) {
    db.getAllCount("message",function(count){
        res.render("index",{
            "pageamount" : Math.ceil(count / 4)
        });
    });
});

app.get('/find',function (req,res,next) {
    var page = parseInt(req.query.page);
    db.find('message',{},{"sort":{"shijian":-1},"pageamount":4,"page":page},function (err,result) {
        res.json({"result":result});
    });
});

app.post('/tijiao', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        //写入数据库
        db.insertOne("message",
            {
                "xingming": fields.xingming,
                "liuyan": fields.liuyan,
                "shijian":new Date()
            }, function (err, result) {
                if(err){
                    res.json('-1');
                    return;
                }
                res.json('1');
            })
    })

});

app.listen(3000);