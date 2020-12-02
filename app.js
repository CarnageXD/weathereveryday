"use strict"
const key = "74d929a73e3642fda3a2696e947bfd22";
const search = document.querySelector(".form-menu");
const searchTheme = document.querySelector(".form-theme")
const mainLoad = document.querySelector("main");
const prevButton = document.querySelector(".button-left")
const nextButton = document.querySelector(".button-right")
const mainTheme = document.querySelector('.main-theme')
let locations;
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();
today = dd + "/" + mm + "/" + yyyy;


search.addEventListener("submit", (event) => {
    event.preventDefault();
    mainTheme.classList.add('hide')
    mainLoad.innerHTML = `<div class="refresh" style = "display: flex; justify-content:center"><img src="weather_icons/refresh.gif"></div>`
    locations = event.target.location.value;
    weatherApp(locations);
});

searchTheme.addEventListener("submit", (event) => {
    event.preventDefault();
    mainTheme.classList.add('hide')
    searchMenu.classList.remove('show')
    mainLoad.innerHTML = `<div class="refresh" style = "display: flex; justify-content:center"><img src="weather_icons/refresh.gif"></div>`
    locations = event.target.location.value;
    weatherApp(locations);
});


async function weatherApp(locations) {
    const data = await fetchAPI(locations);
    const currentData = await currentFetchAPI(locations)
    generateHTML(data, currentData);
}

async function currentFetchAPI(locations) {
    const baseURL = `https://api.weatherbit.io/v2.0/current?city=${locations}&key=${key}&lang=uk`
    const response = await fetch(baseURL);
    const currentData = await response.json();
    console.log(currentData);
    return currentData;
}

async function fetchAPI(locations) {
    const baseURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${locations}&key=${key}&days=${7}&lang=uk`
    const response = await fetch(baseURL);
    const data = await response.json();
    console.log(data);
    return data;
}


function generateHTML(data, currentData) {
    const html = `     
        <div class="container">                
        <div class="weather-effect"><img src="weather_icons/snowfall.gif" height="308px" width="1366px"></div>
            <div class="details">
                <div class="first-sight-info">
                    <div class="degree-description">
                        <div class="degree">
                            <div class="temperature">${currentData.data[0].temp}<span>°с</span></div>
                            <div class="description">${currentData.data[0].weather.description}</div>
                        </div>
                        <div class="additional-degree">
                            <div class="humidity">
                                <div class="additional-degree-name">Вологіcть</div>
                                <div class="additional-degree-index">${Number(currentData.data[0].rh).toFixed(1)}%</div>
                            </div>
                            <div class="separator"> | </div>
                            <div class="wind">
                                <div class="additional-degree-name">Вітер</div>
                                <div class="additional-degree-index">${Number(currentData.data[0].wind_spd).toFixed(1)}м/с</div>
                            </div>

                        </div>
                        <div class="img-description"></div>
                    </div>
                    <div class="geolocation">
                        <div class="location-data">${data.city_name}</div>
                        <div class="date-data">${data.data[0].valid_date.split('-').reverse().join('-')}</div>
                    </div>
                </div>
            </div>

        </div>
        <div class="additional-container">
            <section class="weather">
                <div class="daycontainer">
                    <div class="week-day">${cutDate(data.data[0].valid_date)}</div>
                    <div class="img-description">
                        <img src="weather_icons/${data.data[0].weather.icon}.png">
                    </div>
                    <div class="week-day-temperature">${data.data[0].temp}<span>°с</span></div>
                    <div class="week-day-description">${data.data[0].weather.description}</div>
                </div>
                <div class="daycontainer">
                    <div class="week-day">${cutDate(data.data[1].valid_date)}</div>
                    <div class="img-description">
                        <img src="weather_icons/${data.data[1].weather.icon}.png">
                    </div>
                    <div class="week-day-temperature">${data.data[1].temp}<span>°с</span></div>
                    <div class="week-day-description">${data.data[1].weather.description}</div>
                </div>
                <div class="daycontainer">
                    <div class="week-day">${cutDate(data.data[2].valid_date)}</div>
                    <div class="img-description">
                        <img src="weather_icons/${data.data[2].weather.icon}.png">
                    </div>
                    <div class="week-day-temperature">${data.data[2].temp}<span>°с</span></div>
                    <div class="week-day-description">${data.data[2].weather.description}</div>
                </div>
                <div class="daycontainer">
                    <div class="week-day">${cutDate(data.data[3].valid_date)}</div>
                    <div class="img-description">
                        <img src="weather_icons/${data.data[3].weather.icon}.png">
                    </div>
                    <div class="week-day-temperature">${data.data[3].temp}<span>°с</span></div>
                    <div class="week-day-description">${data.data[3].weather.description}</div>
                </div>
                <div class="daycontainer">
                    <div class="week-day">${cutDate(data.data[4].valid_date)}</div>
                    <div class="img-description">
                        <img src="weather_icons/${data.data[4].weather.icon}.png">
                    </div>
                    <div class="week-day-temperature">${data.data[4].temp}<span>°с</span></div>
                    <div class="week-day-description">${data.data[4].weather.description}</div>
                </div>
                <div class="daycontainer">
                    <div class="week-day">${cutDate(data.data[5].valid_date)}</div>
                    <div class="img-description">
                        <img src="weather_icons/${data.data[5].weather.icon}.png">
                    </div>
                    <div class="week-day-temperature">${data.data[5].temp}<span>°с</span></div>
                    <div class="week-day-description">${data.data[5].weather.description}</div>
                </div>
                <div class="daycontainer">
                <div class="week-day">${cutDate(data.data[6].valid_date)}</div>
                <div class="img-description">
                    <img src="weather_icons/${data.data[6].weather.icon}.png">
                </div>
                <div class="week-day-temperature">${data.data[6].temp}<span>°с</span></div>
                <div class="week-day-description">${data.data[6].weather.description}</div>
            </div>
            </section>
        </div>
`;
    mainLoad.innerHTML = html;
}

function cutDate(data) {
    return data.split('-').splice(1, 2).reverse().join('.')
}

const goBackMenu = document.querySelector('.back-menu')

goBackMenu.addEventListener("click", (e) => {
    e.preventDefault()
    mainTheme.classList.remove("hide")
    btnTheme.classList.remove('hide')
    geoButton.classList.remove('hide')
})