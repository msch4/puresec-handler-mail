var express = require("express");
var bodyParser = require('body-parser');
var master = require("./master.js");
var puresecMicroservice = require("puresec-microservice-js");
var handler = require("./handler.js");

var app = express();

var urlMaster = process.env.MASTER_URL || process.argv[2] || "http://192.168.178.23:3000";
var registrationInterval = process.env.MASTER_REGISTRATION_INTERVAL || process.argv[3] || 5;
var port = process.env.PORT || process.argv[4] || 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/health", function(req, res) {
    console.log("\nhealth: OK");
    res.send("OK");
});

app.post("/notify", function(req, res) {
    console.log("\nnotification received ..");
    console.log(req.body);
    handler.handle();
    res.send("OK");
});

app.listen(port, function() {
    var url = puresecMicroservice.currentAddress() + ":" + port;
    console.log("trigger dummy microservice listening at '%s'", url);

    master.register(url, urlMaster, registrationInterval);
});
