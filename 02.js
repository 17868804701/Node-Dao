/**
 * Created by 黄森 on 2017/7/22.
 */
var express = require('express');
var app = express();
var db = require('./model/db.js');



app.get('/insert',function (req,res) {
    db.insertOne("student",{"name":"laohuang"},function (err,result) {
        if(err){
            console.log("插入失败");
            return;
        }
        res.send("插入成功");
    })
});

app.get("/find",function (req,res) {
    var page =parseInt(req.query.page);
   db.find("student",{},{"pageamount":2,"page":page},function (err,result) {
       if(err){
           console.log("查找失败")
       }
       res.send(result);
   })
});

app.get("/del",function (req,res) {
    var name = req.query.name;
   db.deleteMany('student',{"name":name},function (err,result) {
       if(err){
           console.log(err);
       }
        res.send("删除成功："+result);
   })
});

app.get("/update",function (req,res){
   db.updateMany('student',{"name":"laohuang"},{$set:{"name":"huangsen","age":"20"}},function (err,result) {
       if(err){
           console.log(err);
       }
       res.send(result);
   })
});
app.listen(3000);