/**
 * Created by 黄森 on 2017/7/22.
 */
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;



app.get('/',function (req,res) {
    // Connection URL
    var url = 'mongodb://localhost:27017/database';

    MongoClient.connect(url, function(err, db) {
        if(err){
            console.log("数据库连接失败")
        }
        console.log("数据库连接成功");
        //插入数据
        db.collection('student').insertOne({
            "name":"hahah",
            "age":"100"
        },function (err,result) {
            console.log(result);
            res.send("插入数据成功:"+result);
            db.close();
        });


    });
});
app.listen(3000);