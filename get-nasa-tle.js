var Bottleneck = require("bottleneck/es5");

const tle_url = 'https://data.ivanstanojevic.me/api/tle';

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 333
});

const request = require('request');

request(tle_url, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
});
