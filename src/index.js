

function getWeatherData(response) {
       let temperatureElement = document.querySelector('.current-temperature');
    let humidityElement = document.querySelector('#humidity');
    let windSpeedElement = document.querySelector('#windspeed');
    let cityElement = document.querySelector('#city-main');
    let dateElement = document.querySelector('#date');
    let weatherConditionElement = document.querySelector('#weather-condition');
    let date = new Date(response.data.time * 1000);
    let icon = document.querySelector('#icon');

    icon.innerHTML =`<img src="${response.data.condition.icon_url}" id="icon" />`;
    cityElement.innerHTML = response.data.city ;
    weatherConditionElement.innerHTML = response.data.condition.description;
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    humidityElement.innerHTML = response.data.temperature.humidity;
    windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(date);

    getWeeklyForecast(response.data.city);
}   


function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
    }

    function getWeeklyForecast(city) {
        let apiKey = "5f0e384aoacc74261536bb0t2474bbf6";
        let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayForecast);
    }

    function formatDay(timestamp) {
        let date = new Date(timestamp * 1000);
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[date.getDay()];
    }

    function displayForecast(response) {
    let forecastElement = document.querySelector('#forecast');
    

    let forecastHTML = "";

response.data.daily.forEach(function(day, index) {
    if (index < 6 && index > 0) {
    forecastHTML = forecastHTML + `  
      <div class="forecast-day">
      <div class="day">${formatDay(day.time)}</div>
      <img src="${day.condition.icon_url}" class="weather-forecast-condition" />
      <div class="temp-forecast">
        <div class="temperatures"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
        <div class="temperatures">${Math.round(day.temperature.minimum)}°</div>
      </div>
    </div>`;
    };
});
console.log(response.data);
forecastElement.innerHTML = forecastHTML;
}

function fetchWeatherData(city) {
    let apiKey = "5f0e384aoacc74261536bb0t2474bbf6";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getWeatherData);
}


function searchFormSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector('#search-input');
    
    fetchWeatherData(searchInput.value);
}
let searchFormElement = document.querySelector('#search-form');
searchFormElement.addEventListener('submit', searchFormSubmit); 

fetchWeatherData("Johannesburg");
