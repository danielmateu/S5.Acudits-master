class MyJoke {
  joke: string;
  score: number;
  date: string;
  constructor(joke: string, score: number, date: string) {
    (this.joke = joke), (this.score = score), (this.date = date);
  }
}

const container = document.getElementById("container") as HTMLInputElement;
const boton = document.getElementById("boton") as HTMLInputElement;
const joke:HTMLElement = document.querySelector(".jokeContainer") as HTMLElement;
const jokeContainer = document.getElementById("jokeContainer") as HTMLElement;
const valoration = document.getElementById("valoration") as HTMLInputElement;
const valorationBlock = document.createElement("ul") as HTMLElement;
valorationBlock.classList.add("ul");
let jokeInfo: MyJoke;
let reportJokes: MyJoke[] = [];
let isoDate: string = new Date().toISOString();

valorationBlock.innerHTML = `
<li><button class="btn" id="1">😒</button></li>
<li><button class="btn" id="2">😐</button></li>
<li><button class="btn" id="3">😆</button></li>
`;
//console.log(valorationBlock);


boton.addEventListener("click", getMoreJokes);

//Accés a acudits de Icanhazdadjoke + chucknorris

async function getMoreJokes(): Promise<void> {
  try {
    const resultado = await Promise.all<any>([
      fetch("https://icanhazdadjoke.com", {
        headers: {
          Accept: "application/json",
        },
      }).then(async (value) => await value.json()),
      fetch("https://api.chucknorris.io/jokes/random").then(
        async (value) => await value.json()
      ),
    ]); 
    //console.log('Dad Joke ->',resultado[0].joke);
    //console.log('Chuck Joke ->',resultado[1].value);

    const arrayJokes = [];
    arrayJokes[0] = resultado[0].joke.toString();
    arrayJokes[1] = resultado[1].value.toString();
    const alternarJokes =
      arrayJokes[Math.floor(Math.random() * arrayJokes.length)];
    //console.log(arrayJokes[Math.floor(Math.random() * arrayJokes.length)]);

    valoration.appendChild(valorationBlock);

    //------------REPORT SECTION------------//

    let bad: HTMLButtonElement = document.getElementById("1") as HTMLButtonElement;
    let meh: HTMLButtonElement = document.getElementById("2") as HTMLButtonElement;
    let good: HTMLButtonElement = document.getElementById("3") as HTMLButtonElement;
    let arrayVal = [bad, meh, good];

    arrayVal.filter((val:HTMLButtonElement) =>{
      val.addEventListener('click',function(){
        if (val === bad){
          jokeInfo = new MyJoke(joke.innerHTML,1,isoDate);
          
        }
        if (val === meh){
          jokeInfo = new MyJoke(joke.innerHTML,2,isoDate);
        }
        if(val == good){
          jokeInfo = new MyJoke(joke.innerHTML,3,isoDate);
        }
      });
    });
    if(jokeInfo !== undefined){
      reportJokes.push(jokeInfo);
    }
    console.log(reportJokes);

    return (jokeContainer.textContent = alternarJokes);
  } catch (err) {
    console.log("Error", err);
  }
}

//WEATHER
//No demana acceptar ubicació... WHY?¿
window.addEventListener("load", () => {
  let lon: string | number;
  let lat: string | number;

  let temperaturaValor = <HTMLInputElement>(
    document.getElementById("temperatura-valor")
  );
  let temperaturaDescripcion = <HTMLInputElement>(
    document.getElementById("temperatura-descripcion")
  );

  let ubicacion = <HTMLInputElement>document.getElementById("ubicacion");
  let iconoAnimado = <HTMLInputElement>document.getElementById("icono-animado");

  let vientoVelocidad = <HTMLInputElement>(
    document.getElementById("viento-velocidad")
  );

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      //console.log('Latitud ->',posicion.coords.latitude,'Longitud ->', posicion.coords.longitude);

      //por Ubicacion Actual
      /*
       * api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c813f2748d4825e65ccf6f3bfe4e2464
       */

      //Por Ciudad
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&lang=es&units=metric&appid=c813f2748d4825e65ccf6f3bfe4e2464`
      )
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

