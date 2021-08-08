let latOC = 0.0;
let longOC = 0.0;
let units = "imperial";
let apiKey = `db0acb1fc2ef7da0ca0dee51db450339`;
let apiOneCallEndpoint = `https://api.openweathermap.org/data/2.5/onecall`;
let apiWeatherEndpoint = "https://api.openweathermap.org/data/2.5/weather";
let fahrenheitTemperature = null;
let fahrenheitHighTemp = null;
let fahrenheitLowTemp = null;
let celsiusLink = document.querySelector("#celsius");
let fahrenheitLink = document.querySelector("#fahrenheit");
let searchButton = document.querySelector("#search-input-bar");
let button = document.querySelector("button");

function executeDate() {
  let now = new Date();
  let date = now.getDate();
  let hours = now.getHours();
  let ampm = hours >= 12 ? "pm" : "am";
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
  currentTime.innerHTML = `Last updated: ${hours}:${minutes} ${ampm}`;
}
executeDate();

function changeAppColorBackground() {
  let appBackgroundColor = document.querySelector(".app-background");
  let searchButtonText = document.querySelector("#search-button");
  let time = new Date().getHours();
  if (time >= 0 && time <= 2) {
    appBackgroundColor.style.backgroundImage =
      "linear-gradient(to top, #1b2c47 0%, #000000 100%)";
    appBackgroundColor.classList.add("evening-text-color");
    fahrenheitLink.classList.add("evening-text-color");
    celsiusLink.classList.add("evening-text-color");
    searchButtonText.classList.add("evening-text-color");
  } else if (time === 3 || time === 4) {
    appBackgroundColor.style.backgroundImage =
      "linear-gradient(to top, #225a85 0%, #1b2c47 100%)";
    appBackgroundColor.classList.add("evening-text-color");
    fahrenheitLink.classList.add("evening-text-color");
    celsiusLink.classList.add("evening-text-color");
    searchButtonText.classList.add("evening-text-color");
  } else if (time === 5 || time === 6) {
    appBackgroundColor.style.backgroundImage =
      "linear-gradient(to top, #9598f0 0%, #225a85 100%)";
    appBackgroundColor.classList.add("evening-text-color");
    fahrenheitLink.classList.add("evening-text-color");
    celsiusLink.classList.add("evening-text-color");
    searchButtonText.classList.add("evening-text-color");
  } else if (time === 7) {
    appBackgroundColor.style.backgroundImage =
      "linear-gradient(to bottom, #9598f0 0%, #a1c4fd 100%)";
    appBackgroundColor.classList.remove("evening-text-color");
    fahrenheitLink.classList.remove("evening-text-color");
    celsiusLink.classList.remove("evening-text-color");
    searchButtonText.classList.remove("evening-text-color");
  } else if (time >= 8 && time <= 11) {
    appBackgroundColor.style.backgroundImage =
      "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)";
    appBackgroundColor.classList.remove("evening-text-color");
    fahrenheitLink.classList.remove("evening-text-color");
    celsiusLink.classList.remove("evening-text-color");
    searchButtonText.classList.remove("evening-text-color");
  } else if (time >= 12 && time <= 14) {
    appBackgroundColor.style.backgroundImage =
      "linear-gradient(to top, #7aadff 0%, #c2e9fb 100%)";
    appBackgroundColor.classList.remove("evening-text-color");
    fahrenheitLink.classList.remove("evening-text-color");
    celsiusLink.classList.remove("evening-text-color");
    searchButtonText.classList.remove("evening-text-color");
  } else if (time === 15 || time === 16) {
    appBackgroundColor.style.backgroundImage =
      "linear-gradient(to top, #a1c4fd 0%, #7aadff 100%)";
    appBackgroundColor.classList.remove("evening-text-color");
    fahrenheitLink.classList.remove("evening-text-color");
    celsiusLink.classList.remove("evening-text-color");
    searchButtonText.classList.remove("evening-text-color");
  } else if (time === 17 || time === 18) {
    appBackgroundColor.style.backgroundImage =
      "linear-gradient(to bottom, #a1c4fd 0%, #5d4ba1 100%)";
    appBackgroundColor.classList.remove("evening-text-color");
    fahrenheitLink.classList.remove("evening-text-color");
    celsiusLink.classList.remove("evening-text-color");
    searchButtonText.classList.remove("evening-text-color");
  } else if (time === 19) {
    appBackgroundColor.style.backgroundImage =
      "linear-gradient(to bottom, #5d4ba1 0%, #032845 100%)";
    appBackgroundColor.classList.add("evening-text-color");
    fahrenheitLink.classList.add("evening-text-color");
    celsiusLink.classList.add("evening-text-color");
    searchButtonText.classList.add("evening-text-color");
  } else if (time === 20 || time === 21) {
    appBackgroundColor.style.backgroundImage =
      "linear-gradient(to bottom, #394475 0%, #000000 100%)";
    appBackgroundColor.classList.add("evening-text-color");
    fahrenheitLink.classList.add("evening-text-color");
    celsiusLink.classList.add("evening-text-color");
    searchButtonText.classList.add("evening-text-color");
  } else if (time === 22 || time === 23) {
    appBackgroundColor.style.backgroundImage =
      "linear-gradient(to bottom, #000000 0%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%)";
    appBackgroundColor.classList.add("evening-text-color");
    fahrenheitLink.classList.add("evening-text-color");
    celsiusLink.classList.add("evening-text-color");
    searchButtonText.classList.add("evening-text-color");
  }
}
changeAppColorBackground();

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

  axios
    .get(
      `${apiOneCallEndpoint}?lat=${latOC}&lon=${longOC}&appid=${apiKey}&units=metric`
    )
    .then(displayForecast);
}
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

  axios
    .get(
      `${apiOneCallEndpoint}?lat=${latOC}&lon=${longOC}&appid=${apiKey}&units=imperial`
    )
    .then(displayForecast);
}
fahrenheitLink.addEventListener("click", changeToFahrenheit);

function formatForecastHour(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours} ${ampm}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let hourlyForecast = response.data.hourly;
  let hourlyForecastData = document.querySelector("#upcoming-hourly-data");
  let hourlyForecastHTML = `<div class="row">`;
  hourlyForecast.forEach(function (forecastHour, index) {
    if (index < 6) {
      hourlyForecastHTML =
        hourlyForecastHTML +
        `<div class="col upcoming-hourly-forecast">
            <div class="upcoming-hourly-time">
            ${formatForecastHour(forecastHour.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastHour.weather[0].icon
            }@2x.png" alt="" width="42" />
            <div class="hourly-forecast-temperatures">  
              ${Math.round(forecastHour.temp)}°</div> 
        </div>`;
    }
  });
  hourlyForecastHTML = hourlyForecastHTML + `</div>`;
  hourlyForecastData.innerHTML = hourlyForecastHTML;

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
  let apiUrl = `${apiOneCallEndpoint}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayLocalTimeAndDay(response) {
  console.log(response.data);
  let info = response.data.datetime;
  let indexSpace = info.indexOf(" ");
  let timeZone = response.data.timezone_abbreviation;
  console.log(timeZone);

  let dateString = info.slice(8, indexSpace);
  if (dateString < 10) {
    dateString = info.slice(9, indexSpace);
  }
  console.log(dateString);

  let now = new Date();

  let monthString = info.slice(5, 7);
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
  let month = months[now.getMonth(monthString)];
  console.log(month);

  let year = info.slice(0, 4);
  console.log(year);

  document.getElementById("targetDate").innerHTML = `${month} ${dateString}`;

  let minutesString = info.slice(14, info.length - 3);
  console.log(minutesString);

  let hourString = info.slice(11, info.length - 6);
  let ampm = hourString >= 12 ? "pm" : "am";
  hourString = hourString % 12;
  hourString = hourString ? hourString : 12;
  console.log(hourString);

  document.getElementById(
    "targetTime"
  ).innerHTML = `Local Time: ${hourString}:${minutesString} ${ampm} ${timeZone}`;
}

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;

  fahrenheitTemperature = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(fahrenheitTemperature);

  let tempDescription = response.data.weather[0].description;
  document.querySelector("#current-forecast-description").innerHTML =
    tempDescription;

  fahrenheitHighTemp = response.data.main.temp_max;
  document.querySelector("#temp-high").innerHTML =
    Math.round(fahrenheitHighTemp);

  fahrenheitLowTemp = response.data.main.temp_min;
  document.querySelector("#temp-low").innerHTML = Math.round(fahrenheitLowTemp);

  let humidityData = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = humidityData;

  let windData = response.data.wind.speed;
  document.querySelector("#wind").innerHTML = Math.round(windData);

  let centralIcon = document.querySelector("#central-icon");
  centralIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  centralIcon.setAttribute("alt", response.data.weather[0].description);

  let apiTimeKey = `5fd26f77b6934e30921a24a819be7b47`;
  let tLat = `${response.data.coord.lat}`;
  let tLon = `${response.data.coord.lon}`;
  axios
    .get(
      `https://timezone.abstractapi.com/v1/current_time/?api_key=${apiTimeKey}&location=${tLat},${tLon}`
    )
    .then(displayLocalTimeAndDay);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiWeatherUrl = `${apiWeatherEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiWeatherUrl).then(showTemperature);
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
searchButton.addEventListener("submit", executeSubmit);

function showLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `${apiWeatherEndpoint}?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}
button.addEventListener("click", getCurrentPosition);
