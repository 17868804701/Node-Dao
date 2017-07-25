/**
 * Created by 黄森 on 2017/7/23.
 */
// 封装了对数据库的操作
var MongoClient = require('mongodb').MongoClient;
var setting = require('../setting');

//连接数据路
function _connectDB(callback) {
    // Connection URL
    var url = setting.dburl;
    MongoClient.connect(url, function (err, db) {
        console.log("数据库连接成功");
        if (err) {
            callback(err, null);
            return;
        }
        callback(err, db);
    });
}
// 插入数据
exports.insertOne = function (collectionName, json, callback) {
    _connectDB(function (err, db) {
        db.collection(collectionName).insertOne(json, function (err, result) {
            callback(err, result);
            db.close();
        })
    })
};

// 查找数据,args是一个对象{"pageamount":2,"page":page}
exports.find = function (collectionName,json,C,D) {
    var result = [];   //返回结果的数组
    if (arguments.length == 3) {
        var callback = C;
        var skip = 0;
        var limit = 0;
    } else if (arguments.length == 4) {
        var callback = D;
        var args = C;
        //应该省略的条数
        var skip = args.pageamount * args.page||0;
        //数目限制数
        var limit = args.pageamount||0;
        // 排序
        var sort = args.sort||{}
    } else {
        throw new Error("find函数的参数必须是三个或四个");
        return;
    }
    _connectDB(function (err, db) {
        var cursor = db.collection(collectionName).find(json).skip(skip).limit(limit).sort(sort);
        cursor.each(function (err, doc) {
            if (err) {
                callback(err, null);
                db.close();
                return;
            }
            if (doc != null) {
                result.push(doc);   //放入结果数组中
            } else {
                //没有结果
                callback(null, result);
                db.close();
            }
        })

    })
};

// 删除
exports.deleteMany = function (collectionName, json, callback) {
    _connectDB(function (err, db) {
        db.collection(collectionName).deleteMany(json, function (err, result) {
            callback(result.length);
            db.close();
        })
    })
};

//修改
exports.updateMany = function (collectionName, json1, json2, callback) {
    _connectDB(function (err, db) {
        db.collection(collectionName).updateMany(
            json1,
            json2,
            function (err, results) {
                callback(err, results);
                db.close();
            });
    })
};

//获取总数
exports.getAllCount = function (collectionName,callback) {
    _connectDB(function (err, db) {
        db.collection(collectionName).count({}).then(function(count) {
            callback(count);
            db.close();
        });
    })
};