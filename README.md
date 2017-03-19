# bgsensor

- create a file named ttn.json and insert the values:

```sh
{
    "TTN_REGION": "eu",
    "TTN_APPID": "app-id",
    "TTN_ACCESSKEY": "app-key"
}
```

 - then:

```sh
npm install
npm start
```

 - Time format: [20,17,2,19,16,56,29]
 - Note: January is 0, February is 1, and so on.

 - Your encoder function

```sh
function Encoder(object, port) {
  var bytes = [];
  if (port === 1) {
    if(object.time){
      var now = new Date();
      var year = now.getUTCFullYear() + '';
      var firstYByte = ~~(year.substr(0, year.length -2));
      var lastYByte = ~~(year.substr(year.length -2));

      bytes[0] = firstYByte;
      bytes[1] = lastYByte;
      bytes[2] = now.getUTCMonth();
      bytes[3] = now.getUTCDate();
      bytes[4] = now.getUTCHours();
      bytes[5] = now.getUTCMinutes();
      bytes[6] = now.getUTCSeconds();
    }
  }

  return bytes;
}
```

 - Your decoder function

```sh
function Decoder(bytes, port) {
  var decoded = {};

  if (port === 1){
    if(bytes[0] === 0) {
      decoded.time = true;
    }
  }

  return decoded;
}
```
