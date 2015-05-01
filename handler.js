var nodemailer = require('nodemailer');
try {
    var config = require('./mailconfig.json');
    var recipients = require('./recipients.json');
} catch (e) {
    console.log("You must define both a mailconfig.json and a recipients.json for mailing information");
    process.exit();
}

var handle = function () {
    var transporter = nodemailer.createTransport({
        service: config.service,
        auth: {
            user: config.user,
            pass: config.password
        }
    }),
        addresses = recipients.recipients;

    if (!!addresses) {
        addresses.every(function (elem) {
            console.log("\n Sending a mail to '%s'", elem);
            transporter.sendMail({
                from: 'puresecNotifications@puresec.com',
                to: elem,
                subject: 'CAUTION',
                text: 'Something very evil happened!'
            }, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Message sent: ' + info.response);
                }
            });
        });
    } else {
        console.log("\n No recipients defined");
    }
};

module.exports = {
  handle: handle
};