//https://developer.mapquest.com/documentation/open/geocoding-api/address/get/
//https://home.openweathermap.org/api_keys
// https://ethank2222.github.io/API-Practice/

var a = location.href;
var b = "";
if (a.indexOf("?") != -1){
    var b = a.substring(a.indexOf("?")+1);
}
if (b.length > 0){
    document.getElementById("loc").value = b;
    search();
}

document.getElementById('loc').onkeydown = function(e){
    if(e.keyCode == 13){
        search();
    }
}
function search(){
    var loc = document.getElementById("loc").value;
    var urlGet = "https://open.mapquestapi.com/geocoding/v1/address?key=TR4prB7QVYZ9pSmqSRqnOh3KDAw8Glmw&location=" + loc;
    fetch(urlGet)
    .then(response => response.json())
    .then(function (data){
        var x = document.getElementById("lat");
        x.innerText = data.results[0].locations[0].latLng.lat;
        var y = document.getElementById("long");
        y.innerText = data.results[0].locations[0].latLng.lng;
        document.getElementById("insert").innerHTML=`
        <div id="wrapper">
            <div class="popout">
                <center><h1 id="searchLoc"></h1></center>
                <p id="timeZone"></p>
                <p id="currentTemp"></p>
                <p id="feelsLike"></p>
                <p id="weatherDesc"></p>
            </div>
        </div>
        
        `
        var url = "url(" + data.results[0].locations[0].mapUrl + ")";
        url = url.replace("225,160","1200,1200");
        var wrapper = document.getElementById("wrapper")
        wrapper.style.backgroundImage = url;
        wrapper.style.backgroundPosition = "center";
        wrapper.style.backgroundRepeat = "no-repeat";
        wrapper.style.backgroundSize = "100%";
        weather();
    });
}
function weather(){
    var latitude = parseFloat(document.getElementById("long").innerText);
    var longitude =  parseFloat(document.getElementById("long").innerText);
    urlGet = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=747e9e1a2e6a3c3478a91ad847dec3ca";
    fetch(urlGet)
    .then(response => response.json())
    .then(function (data){
        document.getElementById("searchLoc").innerText = document.getElementById("loc").value;
        document.getElementById("timeZone").innerText = "Time Zone: " + data.timezone;
        document.getElementById("currentTemp").innerText = "Current Temperature: " + data.current.temp;
        document.getElementById("feelsLike").innerText = "Feels Like: " + data.current.feels_like;
        document.getElementById("weatherDesc").innerText = "Current Weather: " + data.current.weather.description;
    });
    window.scroll({ top: 10000, left: 0, behavior: 'smooth'});
      
}

document.getElementById('loc').onfocus = function(){
    document.getElementById('loc').placeholder = "";
}
document.getElementById('loc').addEventListener("focusout", function(){
    document.getElementById('loc').placeholder = "Location";
});