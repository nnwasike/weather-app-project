function executeDate() {
  let now = new Date();
  let date = now.getDate();
  let hours = now.getHours();
  let ampm = hours >= 12 ? "PM" : "AM  ";
  hours = hours % 12;
  hours = hours ? hours : 12;
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = `${day}, ${month} ${date}`;

  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = `${hours}:${minutes} ${ampm}`;
}
executeDate();

function changeToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(
    ((fahrenheitTemperature - 32) * 5) / 9
  );
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let highElement = document.querySelector("#temp-high");
  highElement.innerHTML = Math.round(((fahrenheitHighTemp - 32) * 5) / 9);

  let lowElement = document.querySelector("#temp-low");
  lowElement.innerHTML = Math.round(((fahrenheitLowTemp - 32) * 5) / 9);
}
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeToCelsius);

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let highElement = document.querySelector("#temp-high");
  highElement.innerHTML = Math.round(fahrenheitHighTemp);

  let lowElement = document.querySelector("#temp-low");
  lowElement.innerHTML = Math.round(fahrenheitLowTemp);
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let fahrenheitTemperature = null;
let fahrenheitHighTemp = null;
let fahrenheitLowTemp = null;
//let upcomingCelsiusHighTemp = null;
//let upcomingCelsiusLowTemp = null;

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data);
  //upcomingCelsiusHighTemp = response.data.daily;
  let forecast = response.data.daily;
  let forecastData = document.querySelector("#upcoming-forecast-data");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col upcoming-forecast">
            <div class="upcoming-forecast-weekday">
            ${formatForecastDay(forecastDay.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="42" />
            <div class="weather-forecast-temperatures">  
              <span class="upcoming-high-temp">${Math.round(
                forecastDay.temp.max
              )}°</span> 
              <span class="upcoming-low-temp">${Math.round(
                forecastDay.temp.min
              )}°</span> 
            </div>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastData.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  //console.log(coordinates);
  let units = `imperial`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/onecall`;
  let apiKey = `db0acb1fc2ef7da0ca0dee51db450339`;
  let apiUrl = `${apiEndpoint}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  //console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;

  fahrenheitTemperature = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(fahrenheitTemperature);

  //console.log(response.data.weather);
  let tempDescription = response.data.weather[0].description;
  document.querySelector("#current-forecast-description").innerHTML =
    tempDescription;

  fahrenheitHighTemp = response.data.main.temp_max;
  document.querySelector("#temp-high").innerHTML =
    Math.round(fahrenheitHighTemp);

  fahrenheitLowTemp = response.data.main.temp_min;
  document.querySelector("#temp-low").innerHTML = Math.round(fahrenheitLowTemp);

  //console.log(response.data.main);
  let humidityData = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = humidityData;

  //console.log(response.data.wind);
  let windData = response.data.wind.speed;
  document.querySelector("#wind").innerHTML = Math.round(windData);

  let centralIcon = document.querySelector("#central-icon");
  centralIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  centralIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function searchCity(city) {
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "db0acb1fc2ef7da0ca0dee51db450339";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
searchCity("Berlin");

function executeSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text").value;
  if (city === "") {
    alert("Please enter a city");
  }
  searchCity(city);
}
let searchButton = document.querySelector("#search-input-bar");
searchButton.addEventListener("submit", executeSubmit);

function showGeoLocationTemp(response) {
  //console.log(response.data);
  //console.log(response.data.name);
  let currentGeoCityName = response.data.name;
  document.querySelector("h1").innerHTML = currentGeoCityName;

  let geoTempData = Math.round(response.data.main.temp);
  document.querySelector("#temp").innerHTML = geoTempData;

  //console.log(response.data.weather);
  let geoTempDescription = response.data.weather[0].description;
  document.querySelector("#current-forecast-description").innerHTML =
    geoTempDescription;

  let geoHighTempData = response.data.main.temp_max;
  document.querySelector("#temp-high").innerHTML = Math.round(geoHighTempData);

  let geoLowTempData = response.data.main.temp_min;
  document.querySelector("#temp-low").innerHTML = Math.round(geoLowTempData);
}

function showLocation(position) {
  //console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "db0acb1fc2ef7da0ca0dee51db450339";
  let apiUrlTwo = `${apiEndpoint}?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrlTwo).then(showGeoLocationTemp);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}
let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
