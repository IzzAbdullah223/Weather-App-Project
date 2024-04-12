const form = document.querySelector(".weatherForm")

const cityInput = document.querySelector(".cityInput")

const card = document.querySelector(".Card")

const weatherInfo = document.querySelector(".weatherInfo")

const Header = document.querySelector(".Header")

const image = document.querySelector(".image")

const Celsius = document.querySelector(".Celsius")

const weatherDesc = document.querySelector(".weatherDesc")

const Percentage = document.getElementById("Percentage")

const Speed = document.getElementById("Speed")

const errorDisplay = document.createElement("div");
    errorDisplay.classList.add("errorDisplay");

    card.appendChild(errorDisplay)


  

const APIKey = "905910e225df16f13cfd483a25c79aa7"

card.style.display="none"


form.addEventListener("submit", async (event)=>{
    event.preventDefault();
     
      const Data =  await getWeatherData(cityInput.value)
     if(Data.cod==200){
     displayWeatherInfo(Data)
     }
     
     else{
      displayError();
        }
 
      
})



async function getWeatherData(name){

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${APIKey}`);
    return await   response.json();
}

function displayWeatherInfo(data){
     card.style.display=""
     card.style.height="70vh"
     errorDisplay.textContent=""
     weatherInfo.style.display=""
     
    
    console.log(data)
    console.log(data.weather[0].id);
    console.log(data.wind.speed)

    Header.textContent=data.name;
    image.src=displayWeatherImage(data.weather[0].id);
    Celsius.textContent=`${(data.main.temp - 273.15).toFixed(1)}℃`;
    weatherDesc.textContent=data.weather[0].description;
    Speed.textContent=data.wind.speed+"Km/h"
    Percentage.textContent=data.main.humidity+"%"

    card.appendChild(weatherInfo);
    }

    
 


function displayWeatherImage(weatherID){
    switch(true){
        case weatherID>=500 && weatherID<=531:
            return "rain.png";
            break;

        case weatherID>=600 && weatherID<=622:
            return "snow.png";
            break;

        case weatherID==701:
            return "mist.png";
            break;

        case weatherID==800:
            return "clear.png";
            break;
        
        case weatherID>=801 && weatherID<=804:
            return "cloud.png";
            break;       
    }
    }

function displayError(){
 
    card.style.display = "flex"
    card.style.height = "55vh"
    errorDisplay.textContent="";
    weatherInfo.style.display="none"
    
    const errorimage = document.createElement("img");
        errorimage.src = "no-results.png";

    const errorText = document.createElement("h1");
        errorText.textContent = "Location not found ❗";



        errorimage.classList.add("errorDisplay");
        errorText.classList.add("errorDisplay");

        errorDisplay.appendChild(errorimage);
        errorDisplay.appendChild(errorText);
 
     
  


}

 