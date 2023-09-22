import {
    createCurrentWeather,
    forecastHeader,
    getForecast,
  } from "./ui";


let currTemp = false; //celcius
let currLoc = "auto:ip";

function changeTemp(){
    const temp = document.getElementById("temp-toggle")
    temp.addEventListener("change", (e) => {
        let tempBool = e.target.checked
        if (tempBool){
            currTemp = true
            getLocationData(currLoc)
        }
        else{
            currTemp = false
            getLocationData(currLoc)
        }
});
}

function getLocation(){
    return currLoc
}


async function getLocationData(location){
    const locationError = document.getElementById("error")
    try{
    const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=2efa87e3c68c4dfba8d05608230609&q='+location + "&days=3", {mode: 'cors'})
    response.json().then(function(response) {
      locationError.style.display = "none"
      let name = response.location.name
      currLoc = name
      let forecastArr = response.forecast.forecastday
      forecastHeader(name)
      for (let f of forecastArr){
        getForecast(currTemp, f)
      }
      createCurrentWeather(currTemp, response)

    })
    .catch(() => {
        locationError.style.display = "block"
    });
    }
    catch(error){
        console.log(error);
    }
}


function locationForm(){

    const locationform = document.getElementById("location-form");
    locationform.addEventListener("submit", (e) => {
        e.preventDefault();
        let location = document.getElementById("location-input").value;
        getLocationData(location);

});
}


export default function renderAll(){
    let location = getLocation();
    getLocationData(location)
    changeTemp();
    locationForm();
}



