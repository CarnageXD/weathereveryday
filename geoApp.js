const geolocationButton = document.querySelector('.your-geolocation')


geolocationButton.addEventListener('click', (event) => {
    event.preventDefault()
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        mainTheme.classList.add('hide')
        btnTheme.classList.add('hide')
        geoButton.classList.add('hide')
        weatherApp(lat, lon);
    });
    async function weatherApp(lat, lon) {
        const data = await fetchAPI(lat, lon);
        const currentData = await currentFetchAPI(lat, lon)
        generateHTML(data, currentData);
    }

    async function currentFetchAPI(lat, lon) {
        const baseURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${key}`
        const response = await fetch(baseURL);
        const currentData = await response.json();
        console.log(currentData);
        return currentData;
    }

    async function fetchAPI(lat, lon) {
        try {
            const baseURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}&days=${7}`
            const response = await fetch(baseURL);
            const data = await response.json();
            console.log(data);
            return data;
        }
        catch (e) {
            if (e instanceof SyntaxError)
                alert("Помилка запиту, спробуйте ввести місцеположення по-іншому")
        }
    }

    function generateHTML(data, currentData) {
        if (counter === 0) {
            const html = `     
            <div class="container">                
            <div class="weather-effect"><img src="weather_icons/snowfall.gif" height="308px" width="1366px"></div>
                <div class="details">
                    <div class="first-sight-info">
                        <div class="degree-description">
                            <div class="degree">
                                <div class="last-updated">Останнє оновлення: ${currentData.data[counter].ob_time.split(' ').splice(1, 1)}</div> 
                                <div class="temperature">${currentData.data[counter].temp}<span>°с</span></div>
                                <div class="description">${currentData.data[counter].weather.description}</div>
                            </div>
                            <div class="additional-degree">
                                <div class="humidity">
                                    <div class="additional-degree-name">Вологіcть</div>
                                    <div class="additional-degree-index">${Number(currentData.data[counter].rh).toFixed(1)}%</div>
                                </div>
                                <div class="separator"> | </div>
                                <div class="wind">
                                    <div class="additional-degree-name">Вітер</div>
                                    <div class="additional-degree-index">${Number(currentData.data[counter].wind_spd).toFixed(1)}м/с</div>
                                </div>
                            </div>                        
                        </div>
                        <div class="additional-details">
                            <div class="first-additional">
                                <div class="additional-descriptions">
                                    <div class="additional-name">Почувається як</div>
                                    <div class="additional-index">${currentData.data[counter].app_temp}<span>°с</span></div>
                                </div>
                                <div class="additional-descriptions">
                                    <div class="additional-name">Тиск</div>
                                    <div class="additional-index">${Number(currentData.data[counter].pres).toFixed(1)}</div>
                                </div>
                                <div class="additional-descriptions">
                                    <div class="additional-name">Хмарність</div>
                                    <div class="additional-index">${currentData.data[counter].clouds}%</div>
                                </div>
                            </div>
                            <div class="second-additional">
                                <div class="additional-descriptions">
                                    <div class="additional-name">Видимість</div>
                                    <div class="additional-index">${currentData.data[counter].vis} км</div>
                                </div>
                                <div class="additional-descriptions">
                                    <div class="additional-name">Направлення вітру</div>
                                    <div class="additional-index">${currentData.data[counter].wind_cdir}</div>
                                </div>
                                <div class="additional-descriptions">
                                    <div class="additional-name">Якість повітря</div>
                                    <div class="additional-index">${currentData.data[counter].aqi}</div>
                                </div>
                            </div>
                        </div>
                        <div class="geolocation">
                            <div class="location-data">${data.city_name}</div>
                            <div class="date-data">${data.data[0].valid_date.split('-').reverse().join('-')}</div>
                            <div class="img-description">
                                 <img src="weather_icons/${currentData.data[counter].weather.icon}.png">
                            </div>
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
        else {
            const html = `     
            <div class="container">                
            <div class="weather-effect"><img src="weather_icons/snowfall.gif" height="308px" width="1366px"></div>
                <div class="details">
                    <div class="first-sight-info">
                        <div class="degree-description">
                            <div class="degree">
                                <div class="last-updated">Останнє оновлення: ${currentData.data[0].ob_time.split(' ').splice(1, 1)}</div> 
                                <div class="temperature">${data.data[counter].temp}<span>°с</span></div>
                                <div class="description">${data.data[counter].weather.description}</div>
                            </div>
                            <div class="additional-degree">
                                <div class="humidity">
                                    <div class="additional-degree-name">Вологіcть</div>
                                    <div class="additional-degree-index">${Number(data.data[counter].rh).toFixed(1)}%</div>
                                </div>
                                <div class="separator"> | </div>
                                <div class="wind">
                                    <div class="additional-degree-name">Вітер</div>
                                    <div class="additional-degree-index">${Number(data.data[counter].wind_spd).toFixed(1)}м/с</div>
                                </div>
                            </div>                        
                        </div>
                        <div class="additional-details">
                            <div class="first-additional">
                                <div class="additional-descriptions">
                                    <div class="additional-name">Почувається як</div>
                                    <div class="additional-index">${data.data[counter].app_max_temp}<span>°с</span></div>
                                </div>
                                <div class="additional-descriptions">
                                    <div class="additional-name">Тиск</div>
                                    <div class="additional-index">${Number(data.data[counter].pres).toFixed(1)}</div>
                                </div>
                                <div class="additional-descriptions">
                                    <div class="additional-name">Хмарність</div>
                                    <div class="additional-index">${data.data[counter].clouds}%</div>
                                </div>
                            </div>
                            <div class="second-additional">
                                <div class="additional-descriptions">
                                    <div class="additional-name">Видимість</div>
                                    <div class="additional-index">${Number(data.data[counter].vis).toFixed(1)} км</div>
                                </div>
                                <div class="additional-descriptions">
                                    <div class="additional-name">Направлення вітру</div>
                                    <div class="additional-index">${data.data[counter].wind_cdir}</div>
                                </div>
                                <div class="additional-descriptions">
                                    <div class="additional-name">Вірогідність опадів</div>
                                    <div class="additional-index">${data.data[counter].pop}</div>
                                </div>
                            </div>
                        </div>
                        <div class="geolocation">
                            <div class="location-data">${data.city_name}</div>
                            <div class="date-data">${data.data[0].valid_date.split('-').reverse().join('-')}</div>
                            <div class="img-description">
                                 <img src="weather_icons/${data.data[counter].weather.icon}.png">
                            </div>
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
        for (let i = 0; i <= 6; i++) {
            const days = document.querySelectorAll('div.daycontainer')
            days[i].addEventListener('click', (e) => {
                e.preventDefault();
                counter = i;
                generateHTML(data, currentData)
            })
        }
    }
})
