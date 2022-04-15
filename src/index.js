const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';

//https://api.openweathermap.org/data/2.5/weather?q=barranquilla&appid=82b206db235f11d635e05a7b844cb615&units=metric
//${BASE_URL}${search}&appid=82b206db235f11d635e05a7b844cb615&units=metric

// Consumiendo la API
// async function fetchData(search) {
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=barranquilla&appid=82b206db235f11d635e05a7b844cb615&units=metric`),
//     responseJson = await response.json(),
//     allItems = [];
//     console.log(responseJson);
//     responseJson.data.forEach((item) => {

//     });
// }
const app = document.querySelector('#app');
const search_button = document.getElementById('search_button');
search_button.addEventListener("click", saveCity);
document.addEventListener("keypress", enterKey);

function enterKey(event) {
    // console.log(event);
    if (event.keyCode === 13) {
        saveCity()
    }
}

function saveCity(event) {
    console.log(event);
    const search = document.getElementById('search').value;

    window
        .fetch(`${BASE_URL}${search}&appid=82b206db235f11d635e05a7b844cb615&units=metric&lang=sp`)
        .then(response => response.json())
        .then(data => {
            console.log(`${data.name} - ${data.main.temp}°C`);

            // Card que contiene la info de la ciudad requerida
            const climateCard = document.createElement('div');
                climateCard.className = 'w-3/4 h-auto mx-auto mt-3 bg-blue-300 rounded-2xl text-center text-blue-900';
            // Ciudad requerida
            const city = document.createElement('h2');
                city.className = 'text-xl  font-semibold pt-3';
                city.textContent = `${data.name}, ${data.sys.country}`;
            // Descripcion del clima
            const weatherDescription = document.createElement('p');
                weatherDescription.className = 'text-sm font-semibold';
                weatherDescription.textContent = data.weather[0].description;
            // Icono que describe el clima
            const icon = data.weather[0].icon;
            console.log(icon);
            const iconImage = document.createElement('img');
                iconImage.className = 'mx-auto';
                iconImage.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            // contenedor de temp y viento
            const infoSection = document.createElement('div');
                infoSection.className = 'flex justify-evenly items-center pb-3';
            // Seccion de temperatura
            const tempSection = document.createElement('div');
                tempSection.className = 'flex justify-center items-center';
            
            const iconTemp = document.createElement('img');
                iconTemp.className = 'h-5 mr-2';
                iconTemp.src = `./img/temperature-half-solid.svg`;
                iconTemp.alt = 'temperature-half-solid';
            
            const temp = document.createElement('h2');
                temp.className = 'text-2xl font-semibold';
                temp.textContent = data.main.temp;

            const unitTemp = document.createElement('p');
                unitTemp.className = 'text-lg';
                unitTemp.textContent = '°C';
            // Seccion de viento
            const windSection = document.createElement('div');
                windSection.className = 'flex justify-center items-center';

            const iconWind = document.createElement('img');
                iconWind.className = 'h-5 mr-2';
                iconWind.src = `./img/wind-solid.svg`;
                iconWind.alt = 'wind-solid';
            
            const wind = document.createElement('h2');
                wind.className = 'text-2xl font-semibold';
                wind.textContent = data.wind.speed;

            const unitWind = document.createElement('p');
                unitWind.className = 'text-lg';
                unitWind.textContent = 'km/h';

            tempSection.append(iconTemp, temp, unitTemp);
            windSection.append(iconWind, wind, unitWind);
            infoSection.append(tempSection, windSection);
            climateCard.append(city, weatherDescription, iconImage, infoSection);

            app.appendChild(climateCard);
        });
};
