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