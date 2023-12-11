function checarTecla(event) { 
    if (event.key === "Enter") {
      show_data(); 
    }

  function show_data() {
    var city = document.getElementsByTagName("input")[0].value
               .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    url = `https://api.weatherapi.com/v1/current.json?key=fa7e645695ab4f8db62103857232706&q=${city}`
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        return response.json();
      })
      .then(data => {
        var result = `
                <p><img src="https:${data['current'].condition.icon}" /></p>
                <p style="font-weight: 800;">${data["location"].name}, ${data["location"].region}</p> 
                <span style="font-size: 50px;"> ${data["current"].temp_c}°C </span>
                <p>Feelslike: ${data['current'].feelslike_c}°C </p>
                <p>Humidity: ${data['current'].humidity}% </p>
                <p>Wind: ${data['current'].wind_kph} km/h </p>
                `
        const prg = document.createElement("div")  
        prg.innerHTML = result

        const showWeatherDiv = document.getElementById("show_weather");
        showWeatherDiv.innerHTML = '';

        showWeatherDiv.appendChild(prg)
      })
      .catch(error => {
        console.error('Erro:', error.message);
        const showWeatherDiv = document.getElementById("show_weather");
        showWeatherDiv.innerText = ''; 
      });
  } 
}
