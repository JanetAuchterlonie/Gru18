class Fecha {
  constructor(date) {
    date = date.split("-");
    this.dia = date[2];
    this.mes = date[1];
    this.anio = date[0].substring(2);
    this.date = `${this.mes}/${this.dia}/${this.anio}`;
  }

  getDia() {
    return this.dia;
  }

  getMes() {
    return this.mes;
  }

  getAnio() {
    return this.anio;
  }

  parseDay() {
    const days = {
      Mon: "Lun",
      Tue: "Mar",
      Wed: "Mier",
      Thu: "Jue",
      Fri: "Vier",
      Sat: "Sav",
      Sun: "Dom"
    };
    const fecha = new Date(this.date);
    let day = fecha.toString().split(" ")[0];

    return days[day];
  }
}

function dibujarClima(dato){
  const $cards = document.querySelector(".info__clima");
  const $template = document.getElementById("template__card").content;
  const $fragment = document.createDocumentFragment();
  
  for (let i = 1; i <= 7; i++) {
    let fecha = new Fecha(dato[`day${i}`].date);
    let dia = `${fecha.parseDay()} ${fecha.getDia()}`;
    let icono = `https://v5i.tutiempo.net/wi/01/30/${dato[`day${i}`].icon}.png`;
    let temperaturaMin = `min: ${dato[`day${i}`].temperature_min}°`;
    let temperaturaMax = `max: ${dato[`day${i}`].temperature_max}°`;

    $template.querySelector(".grupo__clima-icono").setAttribute("src", icono);
    $template.querySelector(".grupo__clima-temperatura-min").textContent = temperaturaMin;
    $template.querySelector(".grupo__clima-temperatura-max").textContent = temperaturaMax;
    $template.querySelector(".grupo__clima-dia").textContent = dia;

    let $clone = document.importNode($template, true);
    $fragment.appendChild($clone);
  }

  $cards.appendChild($fragment);
}

function cargarClima(){
  const requestURL = 'https://api.tutiempo.net/json/?lan=es&apid=awT4qqaXzXzbbXq&lid=42833';
  const request = new XMLHttpRequest();

  request.open("GET", requestURL);
  request.responseText = 'json';
  request.send();

  request.onload = function(){
    const datos = request.response;
    dibujarClima(JSON.parse(datos));
  }
}

cargarClima();




