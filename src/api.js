import {
    createCurrentWeather,
    forecastHeader,
    getForecast,
  } from "./ui";



function changeTemp(){
    const temp = document.getElementById("temp-toggle")
    temp.addEventListener("change", (e) => {
        let tempBool = e.target.checked
        let currLoc = location.getLocation
        if (tempBool){
            location.setTemp = true
            
            getLocationData(currLoc)
        }
        else{
            location.setTemp = false
            getLocationData(currLoc)
        }
});
}

async function getLocationData(loc){
    const locationError = document.getElementById("error")
    try{
    const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=2efa87e3c68c4dfba8d05608230609&q='+loc + "&days=3", {mode: 'cors'})
    response.json().then(function(response) {
      locationError.style.display = "none"
      let name = response.location.name
      location.setLocation = name
      console.log('here')
      let currTemp = location.getTemp
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


let location = {
    loc: "auto:ip",
    temp: false, 

    get getLocation(){
        return this.loc;
    },

    set setLocation(loc){
        this.loc = loc;
    },

    get getTemp(){
        return this.temp;
    },
    set setTemp(temp){
        this.temp = temp;
    }
}


export default function renderAll(){
    const currLoc = location.getLocation
    getLocationData(currLoc)
    changeTemp();
    locationForm();
}



