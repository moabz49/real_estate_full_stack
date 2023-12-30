import React from 'react';
import {MapContainer, TileLayer, useMap} from 'react-leaflet';
import GeoCoderMarker from './GeoCoderMarker'

// React-Leaflet is an open-source JavaScript library for mobile-friendly interactive maps.
const Map = ({address, city, country}) => {
  return (
    <MapContainer
        center={[53.35, 18.8]}
        zoom={1}
        scrollWheelZoom={false} 
        style={{
            height: "100%",
            width: "100%",
            zIndex: 0,
        }}
    >
        {/* TileLayer is a type of layer that is used in mapping applications to display a map. It's not a style per se, but it does determine the visual appearance of the map. */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoCoderMarker address={`${address} ${city} ${country}`} />
    </MapContainer>
  )
}

export default Map