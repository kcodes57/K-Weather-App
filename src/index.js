function refreshWeatherData(response) {
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  let temperatureElement = document.querySelector("#temp");
  let timeElement = document.querySelector("#time");
  let windElement = document.querySelector("#wind");

  let city = response.data.city;
  let date = new Date(response.data.time * 1000);
  let description = response.data.condition.description;
  let iconImage = `<img src="${response.data.condition.icon_url}" alt=""/>`;
  let temp = Math.round(response.data.temperature.current);
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;

  cityElement.innerHTML = city;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `${humidity}%`;
  iconElement.innerHTML = iconImage;
  temperatureElement.innerHTML = temp;
  timeElement.innerHTML = formateDate(date);
  windElement.innerHTML = ` ${wind} km/h`;
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

function searchCity(city) {
  let apiKey = "441fcacb9dt020b37114da0ba3e3f5of";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeatherData);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Paris");
