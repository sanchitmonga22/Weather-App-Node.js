const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=f69d4f39791491f04a0f3ec6993f341c&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude); //+ "&units=f";
  request({
      url: url,
      json: true,
    },
    (error, response) => {
      if (error) {
        callback("Unable to connect to the weather service", undefined);
      } else if (response.body.error) {
        callback("Unable to find the weather, try another search", undefined);
      } else {
        callback(undefined, {
          weather: response.body.current,
        });
      }
    }
  );
};

module.exports = forecast;