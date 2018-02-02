var express = require('express');
var app = express();
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
//console.log(req.body.dta);
//var eapr="./dispy.html?feedd=kjbhbjhsvfvnbsdvnfbvfnbvsadvfamnsvbdfn";
//console.log("./dispy.html?feedd=kjbhbjhsvfvnbsdvnfbvfnbvsadvfamnsvbdfn");
//res.sendfile(eapr);
//res.sendfile( "./dispy.html?feedd="+req.body.dta);

    
    res.render('disp',{feedd:req.body.dta});
})
app.get('/***/', function (req, res) {
console.log("other");
})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

})
