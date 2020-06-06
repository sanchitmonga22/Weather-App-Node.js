const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2FuY2hpdG1vbmdhMjIiLCJhIjoiY2thdWh2dzk3MDI1bTJxbzUyZ3Rxd3Z0cyJ9.8W3ovYECT7Sl1_9-N5IPbw&limit=1";
  request({
    url: url,
    json: true
  }, (error, {
    body
  }) => {
    if (error) {
      callback("Unable to connect to the location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the location, try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;