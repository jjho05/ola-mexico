'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type POI = {
  id: number | null;
  title: string;
  lat: number;
  lng: number;
  url?: string | null;
};

type Business = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address?: string;
  distance_km?: number;
};

type Props = {
  center: [number, number];
  userLocation?: [number, number] | null;
  pois: POI[];
  businesses: Business[];
};

const iconShadow = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';
const iconUser = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
const iconBusiness = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
const iconPoi = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function TouristCityMap({ center, userLocation, pois, businesses }: Props) {
  return (
    <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
      <MapContainer center={center} zoom={13} scrollWheelZoom className="h-80 w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocation ? (
          <Marker position={userLocation} icon={iconUser}>
            <Popup>Tu ubicación</Popup>
          </Marker>
        ) : null}
        {businesses.map((biz) => (
          <Marker key={`biz-${biz.id}`} position={[biz.lat, biz.lng]} icon={iconBusiness}>
            <Popup>
              <div className="text-sm font-bold">{biz.name}</div>
              {biz.address ? <div className="text-xs text-gray-500">{biz.address}</div> : null}
            </Popup>
          </Marker>
        ))}
        {pois.map((poi) => (
          <Marker key={`poi-${poi.id ?? poi.title}`} position={[poi.lat, poi.lng]} icon={iconPoi}>
            <Popup>
              <div className="text-sm font-bold">{poi.title}</div>
              {poi.url ? (
                <a className="text-xs text-blue-600" href={poi.url} target="_blank" rel="noreferrer">
                  Wikipedia
                </a>
              ) : null}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
