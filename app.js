"use strict"
const key = "48cb0ce7073e9c7319bf9870cc0582e4";
const search = document.querySelector(".form-menu");
const searchTheme = document.querySelector(".form-theme")
const details = document.querySelector(".details");
const prevButton = document.querySelector(".button-left")
const nextButton = document.querySelector(".button-right")
const mainTheme = document.querySelector('.main-theme')

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();
today = dd + "/" + mm + "/" + yyyy;


alert(`Для тестировщиков
В планах: эффекты мб (в зависимости от погоды), смена оформления (или тоже от погоды или от дня) звук (от погоды и время дня), переоформление подачи самой погоды 100%, ща так себе..И адаптивность под разные разрешения.
Мб чет еще?`)
search.addEventListener("submit", (event) => {
    event.preventDefault();
    details.innerHTML = `<img height="150" width="150" src="weather_icons/refresh.gif">`;
    const location = event.target.location.value;
    weatherApp(location);
});

searchTheme.addEventListener("submit", (event) => {
    event.preventDefault();
    mainTheme.classList.add('hide')
    details.innerHTML = `<img height="150" width="150" src="weather_icons/refresh.gif">`;
    const location = event.target.location.value;
    weatherApp(location);
});

async function weatherApp(location) {
    const data = await fetchAPI(location);
    generateHTML(data);
}

async function fetchAPI(location) {
    const baseURL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&metric&lang=ua`;
    const response = await fetch(baseURL);
    const data = await response.json();
    console.log(data);
    return data;
}

function generateHTML(data) {
    if (data.cod != '404') {
        prevButton.classList.add('show')
        nextButton.classList.add('show')
        const html = `
    <div class="first-sight-info">
                    <div class="location-data">${data.name}</div>
                    <div class="date-data">${today}</div>
                    <div class="temperature">${Math.round(data.main.temp - 273)}<span>°с</span></div>
                    <div class="description">${data.weather[0].description}</div>
                    <div class="feels-like">Почувається як: ${Math.round(data.main.feels_like - 273)}<span>°с</span></div                                       
                    <div class="img-description"><img src = https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png></div>
                </div>
                <div class="secondary-info">
                    <p>Вологість - ${data.main.humidity}%</p>
                    <p>Швидкість вітру - ${data.wind.speed} м/с</p>                                       
                </div>
    `;
        details.innerHTML = html;
    }
    else alert('Дане місцеположення не знайдене, перевірте його написання')
}

