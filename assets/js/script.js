// Variable Declaration
var inputEl
var searchEl

let pastCities = []


// This will be the object of weather that 1st. calls the api that will return lat and lon data that needs to be passed into the second fetch request that has a database that includes a 5 day forecast. 2. Use the data from the 2nd database to pass weather data into the HTML.

let weather = {
    "apiKey": "26ad23d7fd874d6b71525d29ee18252e",

    fetchWeather: function (city) {
        // this fetch will call the api to grab the Lon and lat, using the function displayLatlon
        fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city
            + "&limit=5&appid="
            + this.apiKey)

            .then(response => response.json())
            .then(data => {

                const { lat, lon } = data[0]
                return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat
                    + "&lon=" + lon
                    + "&units=imperial&exclude=minutely,hourly&appid="
                    + this.apiKey)
            })
            .then(response => response.json())
            .then(weatherData => this.displaylatlon(weatherData))

    },

    displaylatlon: function (weatherData) {
        const { timezone } = weatherData
        const { temp, humidity, uvi, wind_speed } = weatherData.current
        const { main, description, icon } = weatherData.current.weather[0]
        const { sunrise } = weatherData.daily[1]


        // Displays the 1st current block of weather data
        document.getElementById("temperature").innerText = "Temperature: " + temp + " F"
        document.getElementById("humidity").innerText = "Humidity: " + humidity + " %"
        document.getElementById("wind").innerText = "Wind Speed: " + wind_speed + " MPH"
        document.getElementById("UV").innerText = "UVI: " + uvi



        // Create a for loop that will iterate through the 5 cards and populate them. Use the daily set from the api JSON (remember that is is an object and each index can be referenced by [] notation)

        for (var i = 0; i <= 5; i++) {
            document.getElementById("tempCard" + (i + 1)).innerText = "Temperature: " + Number(weatherData.daily[i].temp.day) + " F"
            document.getElementById("humidityCard" + (i + 1)).innerText = "Humidity: " + Number(weatherData.daily[i].humidity) + " %"
            document.getElementById("windCard" + (i + 1)).innerText = "Wind Speed: " + Number(weatherData.daily[i].wind_speed) + " mph"
        }

    },

    search: function () {
        //  Need to implement taking input from form, clicking will start search, then a function to handle the enter key being presssed to start search

    }


}

// Allows users to search for city by hitting button, will also display the users choice in the Main Card
document.getElementById("searchBtn").onclick = function () {

    event.preventDefault()
    var inputEl = document.getElementById("cityName").value
    weather.fetchWeather(inputEl)


    setInfo()
    // const newName = document.getElementById('cityName')
    // const setCity = document.getElementById('city')
    // setCity.innerHTML = "" + newName.value + " "
}

// Function to store old cities
function oldCities() {
    const storedCities = JSON.parse(localStorage.getItem('pastCities'))
    if (storedCities) {
        pastCities = storedCities
    }
}

function storeCities() {
    localStorage.setItem('pastCities', JSON.stringify('pastCities'))
}

// grabs name from user input to display
function setInfo() {
    const newName = document.getElementById('cityName')
    const setCity = document.getElementById('city')
    setCity.innerHTML = "" + newName.value + " "
}





// Add button listener to the submit button, as well as taking in input from the input section in the HTML for the searching function.






