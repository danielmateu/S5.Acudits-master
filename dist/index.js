"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class MyJoke {
    constructor(joke, score, date) {
        (this.joke = joke), (this.score = score), (this.date = date);
    }
}
const container = document.getElementById("container");
const boton = document.getElementById("boton");
const joke = document.querySelector(".jokeContainer");
const jokeContainer = document.getElementById("jokeContainer");
const valoration = document.getElementById("valoration");
const valorationBlock = document.createElement("ul");
valorationBlock.classList.add("ul");
let jokeInfo;
let reportJokes = [];
let isoDate = new Date().toISOString();
valorationBlock.innerHTML = `
<li><button class="btn" id="1">😒</button></li>
<li><button class="btn" id="2">😐</button></li>
<li><button class="btn" id="3">😆</button></li>
`;
//console.log(valorationBlock);
boton.addEventListener("click", getMoreJokes);
//Accés a acudits de Icanhazdadjoke + chucknorris
function getMoreJokes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resultado = yield Promise.all([
                fetch("https://icanhazdadjoke.com", {
                    headers: {
                        Accept: "application/json",
                    },
                }).then((value) => __awaiter(this, void 0, void 0, function* () { return yield value.json(); })),
                fetch("https://api.chucknorris.io/jokes/random").then((value) => __awaiter(this, void 0, void 0, function* () { return yield value.json(); })),
            ]);
            //console.log('Dad Joke ->',resultado[0].joke);
            //console.log('Chuck Joke ->',resultado[1].value);
            const arrayJokes = [];
            arrayJokes[0] = resultado[0].joke.toString();
            arrayJokes[1] = resultado[1].value.toString();
            const alternarJokes = arrayJokes[Math.floor(Math.random() * arrayJokes.length)];
            //console.log(arrayJokes[Math.floor(Math.random() * arrayJokes.length)]);
            valoration.appendChild(valorationBlock);
            //------------REPORT SECTION------------//
            let bad = document.getElementById("1");
            let meh = document.getElementById("2");
            let good = document.getElementById("3");
            let arrayVal = [bad, meh, good];
            arrayVal.filter((val) => {
                val.addEventListener('click', function () {
                    if (val === bad) {
                        jokeInfo = new MyJoke(joke.innerHTML, 1, isoDate);
                    }
                    if (val === meh) {
                        jokeInfo = new MyJoke(joke.innerHTML, 2, isoDate);
                    }
                    if (val == good) {
                        jokeInfo = new MyJoke(joke.innerHTML, 3, isoDate);
                    }
                });
            });
            if (jokeInfo !== undefined) {
                reportJokes.push(jokeInfo);
            }
            console.log(reportJokes);
            return (jokeContainer.textContent = alternarJokes);
        }
        catch (err) {
            console.log("Error", err);
        }
    });
}
//WEATHER
//No demana acceptar ubicació... WHY?¿
window.addEventListener("load", () => {
    let lon;
    let lat;
    let temperaturaValor = (document.getElementById("temperatura-valor"));
    let temperaturaDescripcion = (document.getElementById("temperatura-descripcion"));
    let ubicacion = document.getElementById("ubicacion");
    let iconoAnimado = document.getElementById("icono-animado");
    let vientoVelocidad = (document.getElementById("viento-velocidad"));
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((posicion) => {
            //console.log('Latitud ->',posicion.coords.latitude,'Longitud ->', posicion.coords.longitude);
            //por Ubicacion Actual
            /*
             * api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c813f2748d4825e65ccf6f3bfe4e2464
             */
            //Por Ciudad
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=Barcelona&lang=es&units=metric&appid=c813f2748d4825e65ccf6f3bfe4e2464`)
                .then((response) => {
                return response.json();
            })
                .then((data) => {
                // console.log(data);
                let temp = data.main.temp.toFixed(1);
                temperaturaValor.textContent = `${temp} ºC`;
                let name = data.name;
                ubicacion.textContent = `${name}`;
                let desc = data.weather[0].description;
                temperaturaDescripcion.textContent = desc.toLowerCase();
                let velocidad = data.wind.speed;
                vientoVelocidad.textContent = `${velocidad} m/s`;
                //Inyectar ICONOS ANIMADOS
                switch (data.weather[0].main) {
                    case "Clear":
                        iconoAnimado.src = "./img/day.svg";
                        // console.log("Limpio");
                        break;
                    case "Clouds":
                        iconoAnimado.src = "./img/cloudy.svg";
                        // console.log("Limpio");
                        break;
                    case "Snow":
                        iconoAnimado.src = "./img/snowy-1.svg";
                        //console.log("Limpio");
                        break;
                    case "Rain":
                        iconoAnimado.src = "./img/rainy-3.svg";
                        //console.log("Limpio");
                        break;
                    case "Drizzle":
                        iconoAnimado.src = "./img/rainy-1.svg";
                        // console.log("Limpio");
                        break;
                    case "Thunderstorm":
                        iconoAnimado.src = "./img/thunder.svg";
                        //console.log("Limpio");
                        break;
                }
            })
                .catch((error) => {
                console.log(error);
            });
        });
    }
});
//# sourceMappingURL=index.js.map