var request = require("request");

var register = function(url, urlMaster, registrationInterval) {
    console.log("\nregistering at '%s' ..", urlMaster);

    request({
        uri: urlMaster + "/alarm/register/handler",
        method: "POST",
        form: {
            name: "Mail Handler",
            description: "Mail notification",
            url: url
        }
    }, function(error, _, body) {
        if (!error) {
            var jsonBody = JSON.parse(body);
            console.log("result: ", jsonBody);
        } else {
            console.log("error during registration", error, "\nretry ..");
            setTimeout(function() {
                register(url, urlMaster, registrationInterval);
            }, registrationInterval * 1000);
        }
    });
};

module.exports = {
    register: register
};
