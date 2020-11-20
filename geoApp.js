"use strict"
const geolocationButton = document.querySelector('.your-geolocation')


geolocationButton.addEventListener('click', (event) => {
    event.preventDefault()
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        weatherApp(lat, lon);
    });
    async function weatherApp(lat, lon) {
        const data = await fetchAPI(lat, lon);
        generateHTML(data);
    }

    async function fetchAPI(lat, lon) {
        const geoURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
        const response = await fetch(geoURL);
        const data = await response.json();
        console.log(data);
        return data;
    }

    function generateHTML(data) {
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
        mainTheme.classList.add('hide')
    }
    if (Object.cod != '404') {
        prevButton.classList.add('show')
        nextButton.classList.add('show')
    }

})

