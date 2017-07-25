/**
 * Created by 黄森 on 2017/7/25.
 */
var express = require('express');
var app = express();
var session = require('express-session');
var db = require('./model/db.js');


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
//设置模板引擎
app.set("view engine", "ejs");

app.get('/login',function (req,res) {
    res.render('login');
});
app.get('/index',function (req,res) {
   if(req.session.login==1){
       res.send("你好，欢迎"+req.session.username);
   }else {
       res.send("你还没有登录")
   }
});

app.get('/checkLogin',function (req,res) {
    var username = req.query.username;
    var inputPassword = req.query.password;
    db.find('user',{"username":username},function (err,result) {
        if(result.length==0){
            res.send("用户名错误，没有这个用户");
        }
        else if(result[0].password==inputPassword){
            req.session.login='1',
            req.session.username = result[0].username;
            res.send("成功登陆！你是" + result[0].username);
        }else {
            res.send('密码错误');
        }
    })
});
app.listen(3000);
