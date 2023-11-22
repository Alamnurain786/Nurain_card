
const searchBox = document.querySelector('.search input');
const searchbtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const apikey = "ea4a282190d25a6b55adb950c9908f61";
const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';


async function fetchData(city) {
    const response = await fetch(url + city + `&appid=${apikey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const result = await response.json();
        // console.log(result); //data print in consol

        document.querySelector('.city').innerHTML = result.name;
        document.querySelector('.temp').innerHTML = Math.round(result.main.temp) + "°C";
        document.querySelector('.humidity').innerHTML = result.main.humidity + "%";
        document.querySelector('.wind').innerHTML = result.wind.speed + "km/hr";
        document.querySelector('.sun-rise').innerHTML = new Date(result.sys.sunrise * 1000).toLocaleTimeString();
        document.querySelector('.sun-set').innerHTML = new Date(result.sys.sunset * 1000).toLocaleTimeString();
        document.querySelector('.dt').innerHTML = new Date(result.dt * 1000).toLocaleString();
        if (result.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png"
        } else if (result.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        } else if (result.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        } else if (result.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        } else if (result.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";


    }
}
//For searchBtn
searchbtn.addEventListener('click', () => {
    if (searchBox.value.trim() === '') { // If the search box is empty
        document.querySelector(".empty-error").style.display = "block"; // Show the error message
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "none"; // Hide the weather information
    } else {
        document.querySelector(".empty-error").style.display = "none";
        fetchData(searchBox.value);
    }
});

//For EnterKey
searchBox.addEventListener('keyup', function (event) {
    event.preventDefault(); // Prevent the default action
    if (event.keyCode === 13) { // 13 is the key code for Enter
        if (searchBox.value.trim() === '') { // If the search box is empty
            document.querySelector(".empty-error").style.display = "block"; // Show the error message
            document.querySelector(".error").style.display = "none";
            document.querySelector(".weather").style.display = "none"; // Hide the weather information
        } else {
            document.querySelector(".empty-error").style.display = "none";
            fetchData(searchBox.value);
        }
    }
});

//For Dark mode
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;
const isDarkMode = localStorage.getItem("darkMode") === "enabled";
if (isDarkMode) {
    body.classList.add("dark-mode");
    darkModeToggle.checked = true;
}
darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
    } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
    }
});
