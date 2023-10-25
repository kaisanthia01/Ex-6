// script.js
mapboxgl.accessToken =
  "pk.eyJ1Ijoia2Fpc2FudGhpYTAxIiwiYSI6ImNsM2g3b3RwajBwODYzanFpMGN4YmV2MjAifQ.UTA02GOqHSlLk9d0PisY-g";

const map = new mapboxgl.Map({
  container: "map", // ID of the div element for your map
  style: "mapbox://styles/mapbox/streets-v11", // Map style
  center: [100.523186, 13.736717], // Initial map center coordinates
  zoom: 5, // Initial zoom level
});

// Add markers, popups, and other map features as needed
// เรียกใช้งาน Mapbox Directions API
const directions = new MapboxDirections({
  accessToken: mapboxgl.accessToken,
});

map.addControl(directions, "top-right");

// กำหนดตำแหน่งจุด B
directions.setOrigin([100.60165, 13.918162]);

// กำหนดตำแหน่งจุด B
directions.setDestination([100.600833, 13.920656]);

// รับข้อมูลเส้นทางและเวลาการเดินทาง
directions.on("route", (e) => {
  const route = e.route[0];
  const distance = route.distance; // ระยะทาง (เมตร)
  const duration = route.duration / 60; // เวลาการเดินทาง (นาที)

  const routeDetails = document.getElementById("route-details");
  routeDetails.innerHTML = `ระยะทาง: ${distance} เมตร<br>เวลาการเดินทาง: ${duration} นาที`;

  // สร้าง markers สำหรับตำแหน่ง A และ B
  const markerA = new mapboxgl.Marker()
    .setLngLat([100.60165, 13.918162])
    .addTo(map);
  const markerB = new mapboxgl.Marker()
    .setLngLat([100.600833, 13.920656])
    .addTo(map);
});

// Fetch the JSON file and extract the geometry
fetch('/jsonfile.geojson')
  .then((response) => response.json())
  .then((data) => {
    console.log(data.geometry.coordinates);
    if (data.geometry.type === 'LineString') {
      // Set the route using the extracted geometry
      directions.setRoute(data.geometry.coordinates);
    } else {
      console.error('Invalid GeoJSON data.');
    }
  })
  .catch((error) => {
    console.error('Error fetching JSON file:', error);
  });
