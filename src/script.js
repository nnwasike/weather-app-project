function executeDate() {
  let now = new Date();
  let date = now.getDate();
  let hours = now.getHours();
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
  currentTime.innerHTML = `${hours}:${minutes}`;
}
executeDate();

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let highElement = document.querySelector("#temp-high");
  highElement.innerHTML = Math.round((celsiusHighTemp * 9) / 5 + 32);

  let lowElement = document.querySelector("#temp-low");
  lowElement.innerHTML = Math.round((celsiusLowTemp * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

function changeToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let highElement = document.querySelector("#temp-high");
  highElement.innerHTML = Math.round(celsiusHighTemp);

  let lowElement = document.querySelector("#temp-low");
  lowElement.innerHTML = Math.round(celsiusLowTemp);
}
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeToCelsius);

let celsiusTemperature = null;
let celsiusHighTemp = null;
let celsiusLowTemp = null;

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemperature);

  //console.log(response.data.weather);
  let tempDescription = response.data.weather[0].description;
  document.querySelector("#forecast").innerHTML = tempDescription;

  celsiusHighTemp = response.data.main.temp_max;
  document.querySelector("#temp-high").innerHTML = Math.round(celsiusHighTemp);

  celsiusLowTemp = response.data.main.temp_min;
  document.querySelector("#temp-low").innerHTML = Math.round(celsiusLowTemp);

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
}
function searchCity(city) {
  let units = "metric";
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
  document.querySelector("#forecast").innerHTML = geoTempDescription;

  let geoHighTempData = response.data.main.temp_max;
  document.querySelector("#temp-high").innerHTML = Math.round(geoHighTempData);

  let geoLowTempData = response.data.main.temp_min;
  document.querySelector("#temp-low").innerHTML = Math.round(geoLowTempData);
}

function showLocation(position) {
  //console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
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
