const btn = document.querySelector(".sign");
const isp = document.getElementById('current_no-border');
const town = document.getElementById('current_town');
const address = document.getElementById('current_address');
const timezone = document.getElementById('current_timezone');
const ipSearch = document.getElementById('search');  


const api_key = "at_El5SrP6wCszI4dj874vVBx5cneD8Q";
const APIURL = 'https://geo.ipify.org/api/';
let currentVersion = 'v1';
let findOwnIP = 'at_Hi8qfi9ybybpONQFNQnHXUj0ZHSxn&ipAddress=';

var map = L.map('mapid').setView([40.823358, -73.943825], 13);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianV0c3VlZCIsImEiOiJja3JoM2ozcXYwOHp2MnBwZW1tcWw2eTZsIn0.feGZBEd6Xiw3aeEpta_KPw', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>, Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>, Coded by <a href="https://github.com/Jutsued" target="_blank">Pablo A Bonilla</a>',
  id: 'mapbox/streets-v11',
  accessToken: 'pk.eyJ1IjoianV0c3VlZCIsImEiOiJja3JoM2ozcXYwOHp2MnBwZW1tcWw2eTZsIn0.feGZBEd6Xiw3aeEpta_KPw',
  tileSize: 512,
  zoomOffset: -1,
}).addTo(map);

var update_marker = L.icon ({
    iconUrl: './images/icon-location.svg',
    iconSize: [34, 44],
    iconAnchor: [23, 56],
});

// L.marker([40.7485623989342, -73.9855571134774], {icon: update_marker}).addTo(map);


getIPDetails = (results) => {
        console.log(results)
        address.innerHTML = results.ip;
        town.innerHTML = `${results.location.city} ${results.location.country} ${results.location.postalCode}`;
        timezone.innerHTML = "UTC" + results.location.timezone;
        isp.innerHTML = results.isp;

        L.marker([results.location.lat, results.location.lng], {icon: update_marker}).addTo(map);
        map.flyTo([results.location.lat, results.location.lng], 15)

}

// document.addEventListener('load', update_marker);
window.addEventListener('load', function() {
    fetch('https://geo.ipify.org/api/v1?apiKey=at_Hi8qfi9ybybpONQFNQnHXUj0ZHSxn&ipAddress=')
    .then(results => results.json())
    .then(function(results) {
        getIPDetails(results)
    })
});

btn.addEventListener('click', e => {
    fetch('https://geo.ipify.org/api/v1?apiKey=at_Hi8qfi9ybybpONQFNQnHXUj0ZHSxn&ipAddress=' + ipSearch.value)
    .then(results => results.json())
    .then(function(results){
        getIPDetails(results)
    })
    .catch(error => {
        console.log(error)
        alert("Please enter a valid IP address" + error); 
    }) 
})
