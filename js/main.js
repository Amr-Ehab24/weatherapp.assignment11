const apiKey = "3374fa009b1f4b8389f192203240401";
let findBtn = document.getElementById("findBtn");
let searchInput = document.querySelector(".form-search");
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let Days = [ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let dateNow = new Date()
let month = dateNow.getMonth()
let day = dateNow.getDay()
//**get today's date [1 - 31]** 
let dateOfDay = dateNow.getDate()
//**print name of day by using array of --Days-- and knowing the day by using getDay()**
let printDay = Days[day]
let printDayT = Days[(day + 1) % 7];  // Use modulus to handle array bounds
let printDayA = Days[(day + 2) % 7];  // Use modulus to handle array bounds
//**print name of month by using array of --months-- and knowing the day by using getMonth()**
let prinMonth = months[month]
//**showing weather info for your location if you click on location icon**
let dateToday=document.getElementById("dateToday");
let dateTomorrow=document.getElementById("dateTomorrow");
let dateAfter=document.getElementById("dateAfer");
let contactButton=document.getElementById("contactButton");
let closeForm=document.getElementById("close-form");
let contact=document.getElementById("contact");
//=======================================================================================================

function setDate(){
    dateToday.innerHTML=`
    <h3>${printDay}</h3>
    <h4><span>${dateOfDay}</span>/${prinMonth}</h4>`
    
    dateTomorrow.innerHTML=`
    <h4>${printDayT}</h4>
`
dateAfter.innerHTML=`
<h4>${printDayA}</h4>

`
}
setDate();

//=======================================================================================================



let data;

async function checkTodayWeather(x) {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${x}&days=3`);
    data = await response.json();
    const icontomorrow=data.forecast.forecastday[1].day.condition.icon;
    const iconAfter=data.forecast.forecastday[2].day.condition.icon;
    const iconToday=data.current.condition.icon;
    
    

    document.querySelector(".forecast-today-content .location").innerHTML = data.location.name;
    

    document.querySelector(".forecast-today-content .degree .num").innerHTML = data.current.temp_c + `<sup>o</sup>C`;
    document.querySelector(".text-today").innerHTML = data.current.condition.text;
   
    document.querySelector(".wind_kph").innerHTML = data.current.wind_kph;
    document.querySelector(".wind_dir").innerHTML = data.current.wind_dir;
    document.querySelector(".cloud").innerHTML = data.current.cloud;

    //====================================================================================================
    
    document.querySelector(".forecast-after .icon-after").innerHTML =`<img src=http:${iconAfter} alt="" width="62">`;
    document.querySelector(".forecast-today-content .forecast-icon").innerHTML =`<img src=http:${iconToday} alt="" width="65">`;
    document.querySelector(".forecast-tomorrow .forecast-icon").innerHTML =`<img src=http:${icontomorrow} alt="" width="62">`;
     document.querySelector(".forecast-tomorrow .degree").innerHTML =data.forecast.forecastday[1].day.maxtemp_c+ `<sup>o</sup>C`;
    document.querySelector(".forecast-tomorrow small").innerHTML =data.forecast.forecastday[1].day.mintemp_c+ `<sup>o</sup>C`;
    document.querySelector(".forecast-tomorrow small").innerHTML =data.forecast.forecastday[1].day.mintemp_c+ `<sup>o</sup>C`;
    document.querySelector(".forecast-tomorrow .condition").innerHTML =data.forecast.forecastday[1].day.condition.text;
    //========================================================================================================================
    document.querySelector(".forecast-after .degree").innerHTML =data.forecast.forecastday[2].day.maxtemp_c+ `<sup>o</sup>C`;
    document.querySelector(".forecast-after small").innerHTML =data.forecast.forecastday[2].day.mintemp_c+ `<sup>o</sup>C`;
    document.querySelector(".forecast-after small").innerHTML =data.forecast.forecastday[2].day.mintemp_c+ `<sup>o</sup>C`;
    document.querySelector(".forecast-after .condition").innerHTML =data.forecast.forecastday[2].day.condition.text;
    




}

// Initial weather check for default city (Cairo)
checkTodayWeather("cairo");

// Event listener for real-time search
searchInput.addEventListener("input", function () {
    // Call checkTodayWeather with the entered value
    checkTodayWeather(this.value);
});

// Event listener for button click (optional)
findBtn.addEventListener("click", function () {
    // Call checkTodayWeather with the entered value
    checkTodayWeather(searchInput.value);
});

// ========================================== geo location ===================================================
 document.querySelector(".state").addEventListener("click", function () {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
        // Get the user's current position
        navigator.geolocation.getCurrentPosition(async function (position) {
            // Extract latitude and longitude
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Call the checkTodayWeather function with the coordinates
            await checkTodayWeather(`${latitude},${longitude}`);
        }, function (error) {
            console.error("Error getting geolocation:", error.message);
        });
    } else {
        console.error("Geolocation is not supported by your browser");
    }
});
//==============================================================================================================
contactButton.addEventListener("click",function(){
    contact.classList.remove('d-none');

});
closeForm.addEventListener("click",function(){
    contact.classList.add("d-none");
})

