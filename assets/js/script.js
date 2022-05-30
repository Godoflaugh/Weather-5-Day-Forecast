// Variable Declaration
var inputValue = document.querySelector('.cityInput')
var searchBtn = document.getElementById('#searchBtn')





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
            .then(weatherData => console.log(weatherData))

    },
    // Function to grab the latitude and longitude of the city
    //  displaylatlon: function(weatherData) {
    //     const {lat, lon} = weatherData.coord
    //     const{temp} = weatherData.main

    //     return lat, lon
    //     console.log(lat, lon, temp)
    //  }


}

// Add button listener to the submit button, as well as taking in input from the input section in the HTML for the searching function.







