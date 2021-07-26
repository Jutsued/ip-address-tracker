const btn = document.querySelector(".sign");
const isp = document.getElementById('current_no-border');
const town = document.getElementById('current_town');
const address = document.getElementById('current_address');
const timezone = document.getElementById('current_timezone');
const ipSearch = document.getElementById('search');  


const api_key = "at_El5SrP6wCszI4dj874vVBx5cneD8Q";
const APIURL = 'https://geo.ipify.org/api/';
let currentVersion = 'v1';

var map = L.map('mapid').setView([40.823358, -73.943825], 16);


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

L.marker([40.823358, -73.943825], {icon: update_marker}).addTo(map);


getIPDetails = (default_ip) => {
    if(default_ip == undefined) {
        var ip_url = `${APIURL}${currentVersion}?apiKey=${api_key}`
    } else {
        var ip_url = `${APIURL}${currentVersion}?apiKey=${api_key}&ipAddress=${default_ip}`
    }
    fetch(ip_url)
    .then( results => results.json())
    .then( data => {
        address.innerHTML = data.ip;
        town.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`;
        timezone.innerHTML = "UTC" + data.location.timezone;
        isp.innerHTML = data.isp;

        L.marker([data.location.lat, data.location.lng], {icon: update_marker}).addTo(map);
        map.flyTo([data.location.lat, data.location.lng], 16)
        
    })
    .catch(error => {
        alert("Unable to get IP details")
        console.log(error)
    })
}

document.addEventListener('load', update_marker);

btn.addEventListener('click', e => {
    e.preventDefault()
    if(ipSearch.value != '' && ipSearch.value != null) {
        getIPDetails(ipSearch.value)
        return
    }

    alert("Please enter a valid IP address");   
})
