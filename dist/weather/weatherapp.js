"use strict";
window.addEventListener('load', () => {
    let lon;
    let lat;
    let temperaturaValor = document.getElementById('temperatura-valor');
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion');
    let ubicacion = document.getElementById('ubicacion');
    let iconoAnimado = document.getElementById('icono-animado');
    let vientoVelocidad = document.getElementById('viento-velocidad');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;
            //Ubicacion Actual
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=c813f2748d4825e65ccf6f3bfe4e2464`;
            //Ubicacion por Ciudad
            //const url = `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&lang=es&units=metric&appid=c813f2748d4825e65ccf6f3bfe4e2464`
            //console.log(url);
            fetch(url).then(response => {
                return response.json();
            }).then(data => {
                let temp = (data.main.temp).toFixed(1);
                temperaturaValor.textContent = `${temp} ºC`;
                let name = data.name;
                ubicacion.textContent = `${name}`;
                let desc = data.weather[0].description;
                temperaturaDescripcion.textContent = desc.toUpperCase();
                let velocidad = data.wind.seed;
                vientoVelocidad.textContent = `${velocidad} m/s`;
                //ICONOS
                switch (data.weather[0].main) {
                    case 'Clear':
                        iconoAnimado.src = './weather/img/day.svg';
                        console.log('Limpio');
                        break;
                    case 'Clouds':
                        iconoAnimado.src = './weather/img/cloudy.svg';
                        console.log('Limpio');
                        break;
                    case 'Snow':
                        iconoAnimado.src = './weather/img/snowy-1.svg';
                        console.log('Limpio');
                        break;
                    case 'Rain':
                        iconoAnimado.src = './weather/img/rainy-3.svg';
                        console.log('Limpio');
                        break;
                    case 'Drizzle':
                        iconoAnimado.src = './weather/img/rainy-1.svg';
                        console.log('Limpio');
                        break;
                    case 'Thunderstorm':
                        iconoAnimado.src = './weather/img/thunder.svg';
                        console.log('Limpio');
                        break;
                }
            }).catch(error => console.log(error));
        });
    }
});
//# sourceMappingURL=weatherapp.js.map