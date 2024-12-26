"use client";

import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function MyMap(props) {
  const { position, zoom , height} = props;

  return (
    <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} className={`${height} w-full mt-4 rounded`}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
        </Popup>
      </Marker>
    </MapContainer>
  );
}