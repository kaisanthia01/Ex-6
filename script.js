var map = L.map("map").setView([13.917956, 100.60204], 13); // Set the initial map view

// Add a tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Load GeoJSON data and display the geometry on the map
var PointA = new Array();
var PointB = new Array();
fetch("routeMap2.geojson") // Replace with the path to your GeoJSON file
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var features = data.geometry.coordinates;
    if (features.length > 0) {
      /* var firstLine = features[0].geometry.coordinates;
      var lastLine = features[features.length - 1].geometry.coordinates;
      // Log the coordinates of the first and last lines to the console
      console.log("Coordinates of the first line:", firstLine);
      console.log("Coordinates of the last line:", lastLine);*/

      //Coordinates of the PointA
      PointA[0] = features[0][0];
      PointA[1] = features[0][1];

      //Coordinates of the PointB
      PointB[0] = features[features.length - 1][0];
      PointB[1] = features[features.length - 1][1];

      console.log("Coordinates of the PointA:", PointA);
      console.log("Coordinates of the PointB:", PointB);

      var txtPointA = document.getElementById("PointA");
      txtPointA.innerHTML = PointA;

      var txtPointB = document.getElementById("PointB");
      txtPointB.innerHTML = PointB;

      // Create a custom icon
      var MarkerIcon = L.icon({
        iconUrl: "Marker1.png", // URL to your custom icon image
        iconSize: [32, 32], // Size of the icon image
        //iconAnchor: [16, 32], // The point of the icon which should correspond to the marker's location
        //popupAnchor: [0, -32], // The point from which the popup should open relative to the icon
      });

      // Create markers for the first and last coordinates and add them to the map
      L.marker([PointA[1], PointA[0]], { icon: MarkerIcon }).addTo(map);
      L.marker([PointB[1], PointB[0]], { icon: MarkerIcon }).addTo(map);

      const coordinates = data.geometry.coordinates;
      let totalDistanceInKilometers = 0;

      // Calculate distance for each LineString segment
      for (let i = 1; i < coordinates.length; i++) {
        const coord1 = coordinates[i - 1];
        const coord2 = coordinates[i];
        const distance = turf.distance(turf.point(coord1), turf.point(coord2), {
          units: "kilometers",
        });
        totalDistanceInKilometers += distance;
      }

      // Display the calculated distance for each LineString
      console.log(
        `Distance for LineString: ${totalDistanceInKilometers.toFixed(
          2
        )} kilometers`
      );
      var Distance = document.getElementById("Distance");
      Distance.innerHTML = totalDistanceInKilometers.toFixed(2) + " กิโลเมตร";

      //L.geoJSON(data).addTo(map);
      L.geoJSON(data, {
        style: function (feature) {
          return {
            fillColor: "blue", // Fill color of the feature
            color: "red", // Border color "color": "#ff7800"
            weight: 2, // Border width "weight": 5,
            opacity: 1, // Border opacity "opacity": 0.65
            fillOpacity: 0.5, // Fill opacity
          };
        },
      }).addTo(map);
    } else {
      console.log("No LineString features found in the GeoJSON data.");
    }
  });

// Function to calculate the time difference
function calculateTimeDifference(time1, time2) {
  // Parse the time strings and create Date objects
  const date1 = new Date(`2023-10-19T${time1}`);
  const date2 = new Date(`2023-10-19T${time2}`);

  // Calculate the time difference in milliseconds
  const timeDifferenceMillis = Math.abs(date1 - date2);

  // Convert milliseconds to hours, minutes, and seconds
  const hours = Math.floor(timeDifferenceMillis / 3600000); // 3600000 ms = 1 hour
  const minutes = Math.floor((timeDifferenceMillis % 3600000) / 60000); // 60000 ms = 1 minute
  const seconds = Math.floor((timeDifferenceMillis % 60000) / 1000); // 1000 ms = 1 second

  return { hours, minutes, seconds };
}

// Example usage:
const time1 = "08:30:00"; // First time point
const time2 = "15:45:30"; // Second time point

const timeDifference = calculateTimeDifference(time1, time2);
console.log(
  `Time difference: ${timeDifference.hours} hours, ${timeDifference.minutes} minutes, ${timeDifference.seconds} seconds`
);

var Time = document.getElementById("Time");
Time.innerHTML =
  timeDifference.hours +
  " ชั่วโมง " +
  timeDifference.minutes +
  " นาที " +
  timeDifference.seconds +
  " วินาที ";

// Generate a random number between 10 and 30 (inclusive)
const randomNum = Math.floor(Math.random() * (30 - 10 + 1) + 10);
console.log(randomNum);

// Sample URL: https://example.com/index.html?param1=value1&param2=value2

// Get the full URL
const url = window.location.href;

// Parse the URL to extract the query string
const queryString = url.split('?')[1];

// Create an object from the query string
const params = {};
queryString.split('&').forEach(param => {
    const [key, value] = param.split('=');
    params[key] = decodeURIComponent(value);
});

const param1Value = params['param1'];
const param2Value = params['param2'];

console.log('param1:', param1Value);
console.log('param2:', param2Value);

