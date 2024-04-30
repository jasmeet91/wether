// api.openweathermap.org/data/2.5/weather?q={city}&appid={API key}
const weatherApi =  {
    key:"4616ff1d242d662ab6b23f66252fb2fb",
    baseUrl:"https://api.openweathermap.org/data/2.5/weather"
}



const searchInputBox = document.getElementById("input-box");

//event listener function on keypress

searchInputBox.addEventListener('keypress',(event) =>{
     if(event.keyCode == 13){
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
     }
});

//get weather report

function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

//show weather report

  function showWeatherReport(weather){
    console.log(weather);
    let city = document.getElementById("city");
    city.innerText = `${weather.name},${weather.sys.country}`;

    let temp = document.getElementById("temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minmax = document.getElementById("min-max");
    minmax.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weather1 = document.getElementById("wether");
     weather1.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById("date");
    let todaydate = new Date(); 
    date.innerText = dateManage(todaydate);

    //wallpepar
    if(weather.weather[0].main == 'Clear'){
        document.body.style.backgroundImage = "url('image/clear.jpg')";
    }else if(weather.weather[0].main == 'Haze'){
        document.body.style.backgroundImage = "url('image/haze.jpg')";
    }else if(weather.weather[0].main == 'Clouds'){
        document.body.style.backgroundImage = "url('image/cloud.jpg')";
    }
  }

//date manage

   function dateManage(dateArg){
       let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

       let months = ["January","Febuary","March","April","may",
                   "June","July","August","September","October","November","Decmber"];
        
        let year = dateArg.getFullYear();
        let month = months[dateArg.getMonth()];
        let date = dateArg.getDate(); 
        let day = days[dateArg.getDay()];
        
        return `${date} ${month} (${day}), ${year}`;
   }

