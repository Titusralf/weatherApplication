function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;
  fetchTemperature(searchInputElement.value);
}

// Format the date to display day and time
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}

// Add event listener for form submission
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Display temperature and other weather information
function displayTemperature(response) {
  console.log(response.data);

  // Check if required data exists in the response
  if (
    response.data &&
    response.data.temperature &&
    response.data.condition &&
    response.data.wind
  ) {
    let temperature = Math.round(response.data.temperature.current);
    let city = response.data.city;

    let temperatureElement = document.querySelector("#present-temperature");
    temperatureElement.innerHTML = `${temperature}`;

    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let iconElement = document.querySelector("#icon");

    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;

    // Convert the timestamp to a Date object
    let date = new Date(response.data.time * 1000);
    timeElement.innerHTML = formatDate(date);

    // Populate weather details
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  } else {
    console.error("Unexpected API response structure", response.data);
    alert("Unable to retrieve weather data. Please try again later.");
  }
}

// Fetch temperature data from the API
function fetchTemperature(city) {
  let apiKey = "3fe65bdtbe2f46e90e4839f06a35o867";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}