import L from "leaflet";
import "./styles.css";
import "./leaflet.css";
import L from "./leaflet";
const StartMap = (data) => {
  let map = L.map("map", {
    minZoom: -3,
  });
  let layer = L.geoJSON(data, {
    weight: 2,
    onEachFeature: getFeature,
  }).addTo(map);
  let openstreetmap = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  ).addTo(map);
  map.fitBounds(layer.getBounds());
  console.log(Object.keys(data.features[0]));
  console.log(Object.values(data.features[0].properties.nimi));
};
const fetchdata = async () => {
  const url =
    "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
  const result = await fetch(url);
  const data = await result.json();
  StartMap(data);
};
const getFeature = (features, layer) => {
  if (!features.id) return;
  const name = features.properties.nimi;
  //console.log(id);
  layer.bindTooltip(name);
};
fetchdata();
