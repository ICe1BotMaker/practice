window.onload = () => {
    const value = document.getElementById(`value`);

    const temp = document.querySelector(`.temp`);
    const wind_speed = document.querySelector(`.wind-speed`);
    const humidity = document.querySelector(`.humidity`);
    const temp_max = document.querySelector(`.temp-max`);
    const temp_min = document.querySelector(`.temp-min`);
    const weather_image = document.querySelector(`.weather-image`);

    const loading = document.querySelector(`.loading`);
    const output = document.querySelector(`.output`);

    value.onkeyup = e => {
        if (e.key == `Enter`) {
            loading.style.display = `block`;
            output.style.display = `none`;
            
            const getWeather = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${value.value}&appid=1eb1d18602c0e2dde562cdc2005a4495&units=metric`);
        
            getWeather.then(data => data.json())
            .then(data => {
                weather_image.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather">`
                temp.innerHTML = `${data.main.temp}°`;
                wind_speed.innerHTML = `wind speed: ${data.wind.speed}m/s`;
                humidity.innerHTML = `humidity: ${data.main.humidity}%`;
                temp_max.innerHTML = `highest temperature: ${data.main.temp_max}°`;
                temp_min.innerHTML = `minimum temperature: ${data.main.temp_min}°`;

                loading.style.display = `none`;
                output.style.display = `flex`;
            })
            .catch(err => {
                console.log(err);
                loading.style.display = `none`;
                output.style.display = `none`;
            });
        }
    }
}