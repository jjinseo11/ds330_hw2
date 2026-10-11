var map = L.map('map').setView({lat: 40.798214, lon: -77.859909}, 13);

// add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

L.control.scale({imperial: true, metric: true}).addTo(map);

var marker = L.marker({lat: 40.798214, lon: -77.859909}, {icon: greenIcon});
marker.addTo(map);

marker.bindPopup('A popup appears when you click the marker');


function offenseMarkers(offense) {
    if (offense.includes("Harassment") || offense.includes("Assault") || offense.includes("Rape")) {
        return redIcon;}

    else if (offense.includes("Drug") || offense.includes("Possession")) {
        return greenIcon;
    }

    else if (offense.includes("Theft")) {
        return goldIcon;
    }

    else if (offense.includes("Health")) {
        return blueIcon;
    }

    else if (offense.includes("Other")) {
        return orangeIcon;
    }
    else {
        return blackIcon;
    }

}


d3.csv("PSU_ReportedCrimes.csv", function(data) {
    for (var j = 0; j < data.length; j++){
       // your code goes here

       var lat = parseFloat(data[j].Latitude);
       var lon = parseFloat(data[j].Longitude);

       var cMarker = L.marker({lat: lat, lon: lon}, {icon: offenseMarkers(data[j].Offenses)});
       cMarker.addTo(map)

       cMarker.bindPopup(data[j].Content + " (" + data[j].Location + ")");

    }

});