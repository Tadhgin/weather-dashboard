var cityInputEl = document.getElementById("city-input");
var cityButton = document.getElementById("button-addon2");
var cityList = document.getElementById("city-list")
var placeholderCity = document.getElementById("placeholder-city")
var clickableCity = document.getElementById("city-link")
var today = moment().format('MMMM Do, YYYY')
var searchedCities = []
var getCityName = function() {
    var cityName = cityInputEl.value.trim();
    if (cityName === "") {
        alert("Please enter a city name")
    }
    else {
    saveCityName(cityName);
    getCurrentWeatherData();
    fiveDayForecast();
    cityInputEl.value = "";
    }
    return cityName;
}
var date = moment().format('MMMM Do, YYYY')

// Local storage persist
var saveCityName = function (city) {
    var storedCities = localStorage.getItem("cities");
    let workingArray;
    if(storedCities === null) {
        workingArray = []
    } else {
        workingArray = JSON.parse(storedCities);
    }
     // add city name to array
    workingArray.push(city);

    localStorage.setItem("cities", JSON.stringify(workingArray))
}
// weather API
var getCurrentWeatherData = function () {
    var city = document.getElementById("city-input").value;
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=266f11527048c408054397eabed73286"
    )
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        document.getElementById("date").innerHTML = date
        document.getElementById("name").innerHTML = data.name;
        document.getElementById("temp").innerHTML = Math.floor(((data.main.temp -273)*1.8)+32) + " °F";
        document.getElementById("humidity").innerHTML = (data.main.humidity) + '% humidity';
        document.getElementById("wind").innerHTML = data.wind.speed + " mph wind speed";

      });
  };
// UV Index
  var getUvIndex = function() {
    var city = document.getElementById("city-input").value;
    fetch (
        "http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}"
    )
  }
  //5 day forecast
var fiveDayForecast = function () {
    var city = document.getElementById("city-input").value;
    fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=266f11527048c408054397eabed73286"
    )
    .then(function (response) {
        return response.json();
      })
    .then(function (data) {
        console.log(data);
        //Card1
        document.getElementById("ch1").innerHTML = moment().add(1, "days").format('dddd')
        document.getElementById("logo1").src =  "http://openweathermap.org/img/wn/"+ data.list[4].weather[0].icon +"@2x.png"
        document.getElementById("temp1").innerHTML =  Math.floor(((data.list[4].main.temp -273)*1.8)+32) + " °F";
        document.getElementById("humid1").innerHTML = data.list[4].main.humidity + "% Humid";
        //Card2
        document.getElementById("ch2").innerHTML = moment().add(2, "days").format('dddd')
        document.getElementById("logo2").src =  "http://openweathermap.org/img/wn/"+ data.list[12].weather[0].icon +"@2x.png"
        document.getElementById("temp2").innerHTML =  Math.floor(((data.list[12].main.temp -273)*1.8)+32) + " °F";
        document.getElementById("humid2").innerHTML = data.list[12].main.humidity + "% Humid";
        //Card3
        document.getElementById("ch3").innerHTML = moment().add(3, "days").format('dddd')
        document.getElementById("logo3").src =  "http://openweathermap.org/img/wn/"+ data.list[20].weather[0].icon +"@2x.png"
        document.getElementById("temp3").innerHTML =  Math.floor(((data.list[20].main.temp -273)*1.8)+32) + " °F";
        document.getElementById("humid3").innerHTML = data.list[20].main.humidity + "% Humid";
        //Card4
        document.getElementById("ch4").innerHTML = moment().add(4, "days").format('dddd')
        document.getElementById("logo4").src =  "http://openweathermap.org/img/wn/"+ data.list[28].weather[0].icon +"@2x.png"
        document.getElementById("temp4").innerHTML =  Math.floor(((data.list[28].main.temp -273)*1.8)+32) + " °F";
        document.getElementById("humid4").innerHTML = data.list[28].main.humidity + "% Humid";
        //Card5
        document.getElementById("ch5").innerHTML = moment().add(5, "days").format('dddd')
        document.getElementById("logo5").src =  "http://openweathermap.org/img/wn/"+ data.list[36].weather[0].icon +"@2x.png"
        document.getElementById("temp5").innerHTML =  Math.floor(((data.list[36].main.temp -273)*1.8)+32) + " °F";
        document.getElementById("humid5").innerHTML = data.list[36].main.humidity + "% Humid";
        
        unhideCards();
    })
}
var displayPreviousSearches = function() {
    var storedCities = localStorage.getItem("cities")
    var citiesToList = JSON.parse(storedCities);
    console.log(citiesToList)

    for (i=0; i<citiesToList.length; i++) {
        var newItem =  document.createElement("button");
        newItem.className = "list-group-item";
        newItem.id = "city-link";

        var textInput = document.createTextNode(citiesToList[i]);
        newItem.appendChild(textInput);
        cityList.appendChild(newItem)
    }
}
var unhideCards = function () {
    document.getElementById("a").classList.remove("hidden-field")
}
cityButton.addEventListener("click", getCityName);
displayPreviousSearches()