function refreshWeatherData(response) {
  let temperatureElement = document.querySelector("#temp");
  let temp = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temp;
  let cityElement = document.querySelector("#city");
  let city = response.data.city;
  cityElement.innerHTML = city;
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
