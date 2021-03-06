var http = require('http');

function toFahrenheit(temp) {
  return Math.round((temp - 273.15) * 9 / 5 + 32);
}

function parseWeather(req, res, weatherResponse) {
  var weatherData = '';
  var wdata;
  weatherResponse.on('data', function (chunk) {
    weatherData += chunk;
  });
  weatherResponse.on('end', function () {
    var wObj = JSON.parse(weatherData);
    if (wObj.name) {
      wData = {
        name: wObj.name,
        temp: toFahrenheit(wObj.main.temp),
        tempMin: toFahrenheit(wObj.main.temp_min),
        tempMax: toFahrenheit(wObj.main.temp_max),
        humidity: wObj.main.humidity,
        wind: Math.round(wObj.wind.speed * 2.23694), //mph
        clouds: wObj.clouds.all,
        description: wObj.weather[0].main,
        icon: wObj.weather[0].icon
      };
    } else {
      wObj = {
        name: "Not Found"
      };
    }
    res.status(200).json(wData);
  });
}
exports.getWeather = function (req, res) {
  var city = encodeURI(req.query.city);
  var options = {
    host: 'api.openweathermap.org',
    path: '/data/2.5/weather?appid=eabc7845da19a377179baca9f50ffa59&q=' + city
  };
  http.request(options, function (weatherResponse) {
    parseWeather(req, res, weatherResponse);
  }).end();
};