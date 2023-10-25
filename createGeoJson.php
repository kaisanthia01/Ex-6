<?php
// Define your data (latitude and longitude)
$latitude = 37.7749;
$longitude = -122.4194;

// Create a GeoJSON structure
$geojson = array(
    'type' => 'FeatureCollection',
    'features' => array(
        array(
            'type' => 'Feature',
            'geometry' => array(
                'type' => 'Point',
                'coordinates' => array($longitude, $latitude)
            ),
            'properties' => array(
                'name' => 'San Francisco, CA'
            )
        )
    )
);

// Encode the GeoJSON as a JSON string
$geojsonString = json_encode($geojson, JSON_PRETTY_PRINT);

// Save the GeoJSON to a file
file_put_contents('your-geojson-file.geojson', $geojsonString);

echo 'GeoJSON file created successfully.';
