"use strict"
const key = "74d929a73e3642fda3a2696e947bfd22";
const search = document.querySelector(".form-menu");
const searchTheme = document.querySelector(".form-theme")
const mainLoad = document.querySelector("main");
const prevButton = document.querySelector(".button-left")
const nextButton = document.querySelector(".button-right")
const mainTheme = document.querySelector('.main-theme')

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();
today = dd + "/" + mm + "/" + yyyy;


// alert(`Для тестировщиков
// В планах: эффекты мб (в зависимости от погоды), смена оформления (или тоже от погоды или от дня) звук (от погоды и время дня), переоформление подачи самой погоды 100%, ща так себе..И адаптивность под разные разрешения.
// Мб чет еще?`)
search.addEventListener("submit", (event) => {
    event.preventDefault();
    // details.innerHTML = `<img height="150" width="150" src="weather_icons/refresh.gif">`;
    const location = event.target.location.value;
    weatherApp(location);
});

searchTheme.addEventListener("submit", (event) => {
    event.preventDefault();
    mainTheme.classList.add('hide')
    // details.innerHTML = `<img height="150" width="150" src="weather_icons/refresh.gif">`;
    const location = event.target.location.value;
    weatherApp(location);
});

async function weatherApp(location) {
    const data = await fetchAPI(location);
    generateHTML(data);
}

async function fetchAPI(location) {
    const baseURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${location}&key=${key}&days=${7}&lang=uk`
    const response = await fetch(baseURL);
    const data = await response.json();
    console.log(data);
    return data;
}


function generateHTML(data) {
    if (data.cod != '404') {
        const html = `
        <div class="container">
            <div class="details">
                <div class="first-sight-info">
                    <div class="degree-description">
                        <div class="degree">
                            <div class="temperature">0<span>°с</span></div>
                            <div class="description">хмарно</div>
                        </div>
                        <div class="additional-degree">
                            <div class="humidity">
                                <div class="additional-degree-name">Вологіcть</div>
                                <div class="additional-degree-index">90%</div>
                            </div>
                            <div class="separator"> | </div>
                            <div class="wind">
                                <div class="additional-degree-name">Вітер</div>
                                <div class="additional-degree-index">1 м/с</div>
                            </div>

                        </div>
                        <div class="img-description"></div>
                    </div>
                    <div class="geolocation">
                        <div class="location-data">${data.city_name}</div>
                        <div class="date-data">${data.data[0].valid_date}</div>
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
    else alert('Дане місцеположення не знайдене, перевірте його написання')
}

function cutDate(data) {
    return data.split('-').splice(1, 2).reverse().join('.')
}

// function generateHTML(data) {
//     if (data.cod != '404') {
//         // prevButton.classList.add('show')
//         // nextButton.classList.add('show')
//         const html = `
//         <div class="first-sight-info">
//                         <div class="location-data">${data.city_name}</div>
//                         <div class="date-data">${today}</div>
//                         <div class="temperature">${data.data[0].temp}<span>°с</span></div >
//                         <div class="description">${data.data[0].weather.description}</div>
//                         <div class="feels-like">Почувається як ${data.data[0].app_temp}</span></div                                       
//                         <div class="img-description"></div>
//                     </div >
//     <div class="secondary-info">
//         <p>Вологість - ${data.data[0].rh}% </p>
//         <p>Хмарність: ${data.data[0].clouds}%</p>
//     </div>
// `;
//         details.innerHTML = html;
//     }
//     else alert('Дане місцеположення не знайдене, перевірте його написання')
// }

