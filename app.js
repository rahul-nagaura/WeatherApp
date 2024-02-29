let grantAccess = document.querySelector('[btn-access]');
let yourWeather = document.querySelector('[data-yourWeather]');
let searchWeather = document.querySelector('[data-searchWeather]');
let windSpeed = document.querySelector('[wind-speed]');
let humidity = document.querySelector('[humidity-data]');
let clouds = document.querySelector('[clouds-data]');
let temp = document.querySelector('[temperaure]');
let locationTab = document.querySelector(".first-page");
let cityTab = document.querySelector(".last-page");
let mainTab = document.querySelector(".second-page");

// mainTab.classList.remove("active");
let oldTab = locationTab;
oldTab.classList.remove("active");

function swithcTab (newTab)
{
    if(newTab != oldTab){
        oldTab.classList.add("active");
        oldTab = newTab;
        oldTab.classList.remove("active");
        // mainTab.classList.remove("active");
    }
    else{
        // oldTab.classList.add("active");
    }
}

yourWeather.addEventListener('click', () => {
    swithcTab(locationTab);
})

searchWeather.addEventListener('click', () => {
    swithcTab(cityTab);
})

let lati;
let longi;
grantAccess.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            lati = position.coords.latitude;
            longi = position.coords.longitude;
            console.log("lati and longi are", lati, longi);
            weatherL(lati,longi);
        })
        // weatherL(lati,longi);
    }
    else {
        console.log("There is an error");
    }
})
Api_Key = '94a27c17ade75f199f16b2b62acc132b';
async function weatherL(a,b) {
    let response =await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&appid=${Api_Key}&units=metric`)
    let content = await response.json();
    console.log(content);
    displayData1(content);
}


let cityName = document.getElementById('ENter-City');
let City_image = document.querySelector("#City_image")
City_image.addEventListener('click', () => {
    if(cityName.value != ""){
        let cityData = cityName.value;
        console.log("This is ",cityData);
        weatherCity(cityData);
    }
})
Api_key2 = 'b28f59354d16b4e24a74821aa14b3b72';
async function weatherCity(cityData) {
    let responseCity = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityData}&appid=${Api_key2}&units=metric`)
    let contentCity = await responseCity.json();
    console.log(contentCity);
    displayData(contentCity);
} 

async function displayData1 (content) {
    let temp12 = await content.main.temp;
    temp.innerText = temp12;
    let humi = await content.main.humidity;
    humidity.innerText = humi;
    let wind = await content.wind.speed;
    windSpeed.innerText = wind;
    let cloud = await content.clouds.all;
    clouds.innerText = cloud;
    let place = await content.name;
    document.querySelector("[data-city]").innerText = place;
    swithcTab(mainTab);
}
async function displayData (order) {
    let temp = await order.main.temp;
    temp.innerText = temp;
    let humi = await order.main.humidity;
    humidity.innerText = humi;
    let wind = await order.wind.speed;
    windSpeed.innerText = wind;
    let cloud = await order.clouds.all;
    clouds.innerText = cloud;
    let place = await order.name;
    document.querySelector("[data-city]").innerText = place;
    swithcTab(mainTab);
}
