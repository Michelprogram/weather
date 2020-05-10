var time = document.getElementById('Heure');
var temperature = document.getElementById('Temperature');
var lieu = document.getElementById('Place');
var pays = document.getElementById('Country');
var test = document.getElementById('test');
var input = document.getElementById('Town-choice');
var select = document.getElementById('Country-choice');

Meteo();

function Meteo(ville="Paris")
{
  let requete = new XMLHttpRequest();
  requete.open("GET", "http://api.weatherstack.com/current?access_key=9ae6934348bacf41f4369c88a914ab0a&query="+ville);
  requete.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      var response = JSON.parse(this.responseText);
      //console.log(response);
      temperature.innerHTML = response.current.temperature;
      lieu.innerHTML = response.location.name;
      pays.innerHTML = response.location.country;
      Logo(response.current.weather_descriptions[0]);

      var heure = Heure_Clean(response.location.localtime);
      Manage_Background(heure);

      time.innerHTML =  heure;
    }
    else {
      console.log("erreur");
    }
  };

  requete.send();
}
function Logo(wheater)
{
  console.log(wheater);
  //var icone = document.getElementById('icone');
  switch (wheater){
    case "Sunny": //Soleil
      Logo_Update("fas fa-sun","yellow","Soleil");
      break;
    case "Overcast":
    case "Partly cloudy"://Couvert
      Logo_Update("fas fa-cloud","black","Couvert");
      break;
    case "Light Rain":
    case "Light rain shower":
    case "Light Rain, Rain Shower"://Pluie légère
      Logo_Update("fas fa-cloud-sun-rain","#yellow","Pluie légère");
      break;
    case "Patchy light drizzle"://Légère brume
      Logo_Update("fas fa-cloud-rain","black","Légère brume");
      break;
    case "Patchy rain possible"://Pluie possible
      Logo_Update("fas fa-cloud-showers-heavy","gray","Pluie possible");
      break;
    case "Rain Shower"://Pluie zehef
      Logo_Update("fas fa-cloud-showers-heavy","gray","Pluie Violente");
      break;
    case "Rain, Rain Shower":
      Logo_Update("fas fa-poo-storm","black","Pluie violente");
      break;
    case "Haze"://Brume
      Logo_Update("fas fa-cloud","black","Brume");
      break;
    case "Light sleet showers"://Neige légère
      Logo_Update("far fa-snowflake","white","Neige légère");
      break;
    case "Clear"://Nuit calme
      Logo_Update("fas fa-moon","#998988","Nuit sans nuages");
      break;
  }
}
function Heure_Clean(time)
{
  var position = 0;
  for (var i = 0; i < time.length; i++)
  {
    time[i] === " " ? position = i:{};
  }
  return time.substr(position,time.length);
}
function Heure_Cut(time)
{
  for (var i = 0; i < time.length; i++)
  {
    time[i] === ":" ? position = i:{};
  }
  return time.substr(0,position);
}
function Manage_Background(time)
{
  var heure = Heure_Cut(time)
  heure = parseInt(heure);
  (heure>20 || heure <6) ? document.getElementById('main').style.backgroundColor = "#36393E":document.getElementById('main').style.backgroundColor = "#87A9E0";
}
function Logo_Update(class_name,code_couleur,title)
{
  icone.className = class_name;
  icone.style.color = code_couleur;
  icone.title = title;
}

input.addEventListener('change',() => Meteo(input.value));

select.addEventListener('change',() => Meteo(input.value +" "+select.value));
