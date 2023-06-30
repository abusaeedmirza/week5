import L from "leaflet";
function StartMap(data) {
  let map = L.map("map", {
    minZoom: -3
  });
  let layer = L.geoJSON(data, {
    weight: 2
  }).addTo(map);
  let openstreetmap = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  ).addTo(map);
  map.fitBounds(layer.getBounds());
}
const fetchdata = async () => {
  const url =
    "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
  const result = await fetch(url);
  const data = await result.json();
  StartMap(data);
};
fetchdata();