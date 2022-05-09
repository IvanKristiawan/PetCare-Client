mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: locations, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(locations)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h5>${locationTitle}</h5><p>${locationLocate}</p>`
        )
    )
    .addTo(map)