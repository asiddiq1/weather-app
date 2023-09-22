function createCurrentWeather(currTemp, response){

    let loc = response.location
    let curr = response.current
    const src = curr.condition.icon
    const name = loc.name
    const country = loc.country 
    const weather = curr.condition.text 
    let temp
    const update = curr.last_updated

    const weatherDiv = document.querySelector(".current-weather")
    weatherDiv.textContent = ""

    const weatherImg = document.createElement("img")
    weatherImg.src = "http:" + src
    weatherImg.alt = "today"
    weatherImg.className = "forecast"

    const currentHeader = document.createElement("div")
    currentHeader.textContent = "Current Weather For " + name + ", " + country
    currentHeader.className = "current-header"

    const weatherToday = document.createElement("div")
    weatherToday.textContent = weather
    weatherToday.className = "weather-today"

    const tempToday = document.createElement("div")
    if (currTemp){
        temp = curr.temp_f
        tempToday.textContent = temp + "°F"
    }
    else{
        temp = curr.temp_c
        tempToday.textContent = temp + "°C"
    }

    tempToday.className = "temp-today"

    const updated = document.createElement("div")
    let dt = new Date(update)
    let date = dt.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", time: "long"}) 
    let time = dt.toLocaleTimeString("en-US", {hour: '2-digit', minute: '2-digit'})
    updated.textContent = "Updated: " + date + " "+ time
    updated.className = "updated"

    weatherDiv.append(weatherImg, currentHeader, weatherToday, tempToday, updated); 

}


function forecastHeader(city){
    const forecastDiv = document.querySelector(".forecast-container")
    forecastDiv.textContent = ""

    const forecastHead = document.createElement("div")
    forecastHead.className = "forecast-header"
    forecastHead.textContent = "Forecast For " + city

    const forecastDays = document.createElement("div")
    forecastDays.className = "forecast-days"
    forecastDays.id = "forecast-days"

    forecastDiv.append(forecastHead, forecastDays)
}

function getForecast(currTemp, forecast){
    const forecastday = forecast.day
    const date = forecast.date;
    let highTemp = forecastday.maxtemp_c
    let lowTemp = forecastday.mintemp_c
    const weather = forecastday.condition.text 
    const src = forecastday.condition.icon

    const forecastDiv = document.getElementById("forecast-days")

    const forecastCard = document.createElement("div")
    forecastCard.className = "forecast-card"

    const imgDiv = document.createElement("div")
    const weatherImg = document.createElement("img")
    imgDiv.className = "weather-icon"
    weatherImg.src = "http:" + src
    weatherImg.alt = "forecast"
    weatherImg.className = "forecast"
    imgDiv.append(weatherImg)

    let dt = new Date(date)
    let weekday = dt.toLocaleDateString('en-us', { weekday:"long"})
    let newDate = dt.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"}) 

    const weekdayDiv = document.createElement("div")
    weekdayDiv.append(weekday)

    const dateDiv = document.createElement("div")
    dateDiv.append(newDate)

    const conditionDiv = document.createElement("div")
    conditionDiv.append(weather)
    let highTempTxt
    let lowTempTxt
    if (currTemp){
        highTemp = forecastday.maxtemp_f
        lowTemp = forecastday.mintemp_f
        highTempTxt = "H: " + highTemp + "°F"
        lowTempTxt = "L: " + lowTemp + "°F"
      }
      else{
        highTemp = forecastday.maxtemp_c
        lowTemp = forecastday.mintemp_c
        highTempTxt = "H: " + highTemp + "°C"
        lowTempTxt = "L: " + lowTemp + "°C"
    }

    const highTempDiv = document.createElement("div")
    highTempDiv.append(highTempTxt)

    const lowTempDiv = document.createElement("div")
    lowTempDiv.append(lowTempTxt)

    forecastCard.append(imgDiv, weekdayDiv, dateDiv, conditionDiv, highTempDiv, lowTempDiv)

    forecastDiv.append(forecastCard)
}



export {
    createCurrentWeather,
    forecastHeader,
    getForecast,
  };