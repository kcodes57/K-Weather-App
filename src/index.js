function refreshWeatherData(response) {
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  let temperatureElement = document.querySelector("#temp");
  let timeElement = document.querySelector("#time");
  let unitElement = document.querySelector("#unit");
  let windElement = document.querySelector("#wind");

  let city = response.data.city;
  let date = new Date(response.data.time * 1000);
  let description = response.data.condition.description;
  let iconImage = `<img src="${response.data.condition.icon_url}" alt=""/>`;
  let temp = Math.round(response.data.temperature.current);
  let unit = prompt("Please type C for Celsius or F for fahrenheit");
  let unitLowerCase = unit.toLowerCase();
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;

  if (unit === "c") {
    getForecastCelsius(response.data.city);
  } else {
    getForecastFahrenheit(response.data.city);
  }

  cityElement.innerHTML = city;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `${humidity}%`;
  iconElement.innerHTML = iconImage;
  temperatureElement.innerHTML = temp;
  timeElement.innerHTML = formateDate(date);
  windElement.innerHTML = ` ${wind} km/h`;
  if (unit < 2) {
    getForecastCelsius(response.data.city);
  } else {
    getForecastFahrenheit(response.data.city);
  }
}

function formateDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCityCelsius(city) {
  let apiKey = "441fcacb9dt020b37114da0ba3e3f5of";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeatherData);
}

function searchCityFahrenheit(city) {
  let apiKey = "441fcacb9dt020b37114da0ba3e3f5of";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeatherData);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecastCelsius(city) {
  let apiKey = "441fcacb9dt020b37114da0ba3e3f5of";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getForecastFahrenheit(city) {
  let apiKey = "441fcacb9dt020b37114da0ba3e3f5of";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function formateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="weather-forecast">
            <div class="weather-forecast-day">
              <div class="weather-forecast-date">${formateDay(day.time)}</div>
              <div >
                <img src="${
                  day.condition.icon_url
                }" class="weather-forecast-icon">
              </div>
              <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature">
                  <strong>${Math.round(day.temperature.maximum)}°</strong>
                </div>
                <div class="weather-forecast-temperature">${Math.round(
                  day.temperature.minimum
                )}°</div>
              </div>
            </div>
            </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
let unit = prompt(
  "Do you want data shown in Celsius or Fahrenheit? Please enter 1 for Celsius or 2 for Fahrenheit."
);

function weatherUnit(prompt) {}

searchFormElement.addEventListener("submit", handleSearchSubmit);
if (unit < 2) {
  searchCityCelsius("Paris");
} else {
  searchCityFahrenheit("Minneapolis");
}
