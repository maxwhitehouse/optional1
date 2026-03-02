var map = L.map('map').setView([51.505, -0.09], 13);

var L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS popup.<br> Easily customizable.')
//     .openPopup();


// var myDiv = document.getElementById("example");
// myDiv.innerHTML = "Look at this"

fetch('/data/airports.geojson')
  .then(response => response.json())
  .then(data => {
    var vorP = turf.voronoi(data) 
    var Kport = turf.point([ -97.428738768397594, 37.652927960390301 ])
    L.geoJson(vorP, {
      onEachFeature: function (feature, layer) {
        layer.on('click', function () {
          var props = feature.properties;

          layer.bindPopup(
            "<b>" + props.name + "</b><br>"
          ).openPopup();

        });

      }
    }).addTo(map);

  })
  .catch(err => console.error(err));

  // for loop
  // distance from every point 

// var from = turf.point([-75.343, 39.984]);
// var to = turf.point([-75.534, 39.123]);
// var options = { units: "miles" };

// var distance = turf.distance(from, to, options);


