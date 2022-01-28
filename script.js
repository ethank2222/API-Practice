//https://developer.mapquest.com/documentation/open/geocoding-api/address/get/
//https://home.openweathermap.org/api_keys

document.getElementById('loc').onkeydown = function(e){
    if(e.keyCode == 13){
        search();
    }
}
function search(){
    var loc = document.getElementById("loc").value;
    var urlGet = "http://open.mapquestapi.com/geocoding/v1/address?key=TR4prB7QVYZ9pSmqSRqnOh3KDAw8Glmw&location=" + loc;
    fetch(urlGet)
    .then(response => response.json())
    .then(function (data){
        var x = document.getElementById("lat");
        x.innerText = data.results[0].locations[0].latLng.lat;
        var y = document.getElementById("long");
        y.innerText = data.results[0].locations[0].latLng.lng;
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
        var x = document.getElementById("searchLoc");
        x.innerText = data.timezone;
    });
    window.scroll({ top: 10000, left: 0, behavior: 'smooth'});
      
}