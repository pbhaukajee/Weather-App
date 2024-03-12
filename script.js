let getData;

function Weather(
  city,
  region,
  country,
  localTime,
  tempInF,
  tempInC,
  windInMph,
  windInKph,
  humidity,
  condition
) {
  this.city = city;
  this.region = region;
  this.country = country;
  this.localTime = localTime;
  this.tempInF = tempInF;
  this.tempInC = tempInC;
  this.windInMph = windInMph;
  this.windInKph = windInKph;
  this.humidity = humidity;
  this.condition = condition;
}

async function getWeatherData() {
  let cityName = document.querySelector(".input-location").value;
  if (cityName === "") return;
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=46a514cf0beb4e5aa1e164203241003&q=${cityName}`
    );
    const weatherInfo = await response.json();
    let city = weatherInfo.location.name;
    let region = weatherInfo.location.region;
    let country = weatherInfo.location.country;
    let localTime = weatherInfo.location.localtime;
    let tempInF = weatherInfo.current.temp_f;
    let tempInC = weatherInfo.current.temp_c;
    let windInMph = weatherInfo.current.wind_mph;
    let windInKph = weatherInfo.current.wind_kph;
    let humidity = weatherInfo.current.humidity;
    let condition = weatherInfo.current.condition.text;
    if (condition === "Overcast") {
      condition = "Cloudy";
    }
    console.log(weatherInfo);
    getData = new Weather(
      city,
      region,
      country,
      localTime,
      tempInF,
      tempInC,
      windInMph,
      windInKph,
      humidity,
      condition
    );
    render();
    changeBackground();
  } catch {
    alert("There is no such city");
  }
}

function render() {
  let weatherData = document.querySelector(".weather-data");
  weatherData.style.display = "block";
  let condition = getData.condition;
  if (condition === "Sunny") {
    condition += "☀️";
  } else if (condition === "Cloudy" || condition === "Partly cloudy") {
    condition += "☁️";
  } else if (
    condition === "Heavy rain" ||
    condition === "Moderate rain" ||
    condition === "Light rain"
  ) {
    condition += "🌧";
  } else {
    condition += "";
  }

  weatherData.innerHTML = `
  <div class="location-name">
    <h1>${getData.city}${getData.region ? "," : ""} ${getData.region}</h1>
    <h3>${getData.country}</h3>
  </div>
  <div>Local time: ${getData.localTime}</div>
  <div class="other-data">
    <p>Temperature: ${getData.tempInF} ℉ / ${getData.tempInC} ℃</p>
    <h2 class="condition">${condition} </h2>
    <p>Humidity: ${getData.humidity}</p>
    <p>Wind: ${getData.windInMph} mph / ${getData.windInKph} kph</p>
  </div>
  `;
}

const searchBtn = document.querySelector(".search");

searchBtn.addEventListener("click", () => {
  getWeatherData();
});

function changeBackground() {
  if (getData.condition == "Sunny") {
    document.body.style.backgroundImage = "url('./images/sunny.jpg')";
  } else if (
    getData.condition == "Cloudy" ||
    getData.condition == "Partly cloudy"
  ) {
    document.body.style.backgroundImage = "url('./images/cloudy.jpg')";
  } else if (
    getData.condition == "Heavy rain" ||
    getData.condition == "Moderate rain" ||
    getData.condition == "Light rain"
  ) {
    document.body.style.backgroundImage = "url('./images/rainy.jpg')";
  } else {
    document.body.style.backgroundImage = "url('./images/base.jpg')";
  }
}
