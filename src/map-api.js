var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=<YOUR_API_KEY>';

var kelvinToCelsius = function(kelvin) {
  return Math.round(kelvin - 273.15) + '˚C'
}

module.exports = function(latitude, longitude) {
  var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;
  return fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      return {
        city: json.name,
        temperature: kelvinToCelsius(json.main.temp),
        description: json.weather[0].description
      }
    })
}
