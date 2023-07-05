import L from "leaflet";
const StartMap = (data, positiveData, negativeData) => {
  let map = L.map("map", {
    minZoom: -3,
  });
  let layer = L.geoJSON(data, {
    weight: 2,
    onEachFeature: (feature, layer) => {
      if (!feature.id) return;
      const name = feature.properties.nimi;
      const id = feature.id;
      const str = id;
      const parts = str.split(".");
      const lastInteger = parseInt(parts[1]);
      const positiveMigration = positiveData.dataset.value;
      const negativeMigration = negativeData.dataset.value;

      layer.bindTooltip(
        `<ul> 
        <li>Name: ${name}</li>
        </ul>`
      );
      layer.bindPopup(
        `<ul> 
       <li>Positive Migration: ${positiveMigration[lastInteger - 1]}</li>
       <li>Negative Migration: ${negativeMigration[lastInteger - 1]}</li>
       </ul>`
      );
    },
    style: (feature) => {
      const id = feature.id;
      const str = id;
      const parts = str.split(".");
      const lastInteger = parseInt(parts[1]);
      const positiveMigration = positiveData.dataset.value[lastInteger - 1];
      const negativeMigration = negativeData.dataset.value[lastInteger - 1];
      const hue = Math.pow(positiveMigration / negativeMigration, 3) * 60;
      const maxhue = Math.min(hue, 120);

      return { color: `hsl(${maxhue}, 75%, 50%)`, weight: 2 };
    },
  }).addTo(map);

  let openstreetmap = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "© OpenStreetMap",
    }
  ).addTo(map);
  map.fitBounds(layer.getBounds());
};

const getStyle = (feature) => {};

async function fetchdata() {
  const url =
    "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
  const result = await fetch(url);
  const data = await result.json();

  const url2 =
    "https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f";
  const result2 = await fetch(url2);
  const positiveData = await result2.json();
  const url3 =
    "https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e";
  const result3 = await fetch(url3);
  const negativeData = await result3.json();

  StartMap(data, positiveData, negativeData);
}

fetchdata();
