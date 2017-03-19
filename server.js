var ttn = require('ttn');

var region,
    appId,
    accessKey;

var initTTN = function(config) {
    var client = new ttn.Client(config.TTN_REGION, config.TTN_APPID, config.TTN_ACCESSKEY);

    client.on('connect', function(connack) {
        console.info('[DEBUG]', 'Connect:', connack);
    });

    client.on('error', function(err) {
        console.error('[ERROR]', err.message);
    });

    client.on('activation', function(deviceId, data) {
        console.info('[INFO] ', 'Activation:', deviceId, data);
    });

    /*
     *
     * null = all devices *, 'led' = field to listen for
     */
    client.on('message', null, 'time', function(deviceId, flag) {

        // Set the time in the format
        var payload = {
            time: true
        };

        // If you don't have an encoder payload function:
        // var payload = [];
        // var now = new Date();
        // var year = now.getUTCFullYear() + '';
        // var firstYByte = ~~(year.substr(0, year.length -2));
        // var lastYByte = ~~(year.substr(year.length -2));
        //
        // payload[0] = firstYByte;
        // payload[1] = lastYByte;
        // payload[2] = now.getUTCMonth();
        // payload[3] = now.getUTCDate();
        // payload[4] = now.getUTCHours();
        // payload[5] = now.getUTCMinutes();
        // payload[6] = now.getUTCSeconds();

        console.info('[DEBUG]', 'Sending:', JSON.stringify(payload));
        client.send(deviceId, payload);
    });
};
