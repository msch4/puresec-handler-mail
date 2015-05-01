var os = require( 'os' );

var currentCallbackAddress = function() {
    var networkInterfaces = os.networkInterfaces( );
    for (var networkInterface in networkInterfaces) {
        var interface = networkInterfaces[networkInterface];

        for (var i = 0; i < interface.length; i++) {
            var name = interface[i];
            if (name.address !== '127.0.0.1' && name.family === 'IPv4' && !name.internal) {
                return "http://" + name.address;
            }
        }
    }
};

module.exports = {
    currentCallbackAddress: currentCallbackAddress
};
