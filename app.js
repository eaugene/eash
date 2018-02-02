var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("data");
    dbo.createCollection("datas", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

var rev=function (x)
{var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    for(var i=x.length-1;i>=0;i--)
    {
        if(x[i]=="0")
        {
            x=setCharAt(x,i,str[0]);
            continue;
        }
        else
        {
            x=setCharAt(x,i,str[str.indexOf(x[i])+1]);
            break;
        }

    }
    return x;
}

var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    console.log("home");
    res.sendFile( __dirname + "/" + "home.html" );
})

app.post('/feed', function (req, res) {
console.log("feed");
var ea="";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
console.log("12");
        var dbo = db.db("data");
        dbo.collection("datas").findOne({key:"last"}, function(err, result) {
            if (err) throw err;
            //console.log(result.value);
            ea=rev(result.value);
            var myobj = {key: ea, value: req.body.dta};
            dbo.collection("datas").insertOne(myobj, function (err, re) {
                if (err) throw err;
                console.log("13");
                console.log(ea + req.body.dta);
                //db.close();
            });
            console.log(ea);
            var myquery = { key:"last" };
            var newvalues = { key:"last" , value : ea };
            dbo.collection("datas").updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("14");
                console.log("last updated");
                //db.close();
            });
            //db.close();
            res.render('disp',{feedd:ea});
        });


        /**/

    });
});




app.get('/***/', function (req, res) {
console.log("other");
});
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)

});
