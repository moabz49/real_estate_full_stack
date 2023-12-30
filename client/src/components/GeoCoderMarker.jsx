import React, { useEffect, useState } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Icon for the map marker
let DefaultIcon = L.icon ({
    iconUrl : icon, 
    shadowUrl: iconShadow
})
L.Marker.prototype.options.icon = DefaultIcon


const GeoCoderMarker = ({address}) => {

    // useMap is a hook that provides access to the Leaflet map instance
    const map = useMap()

    // useState hook to manage the position state of the marker
    // there's no specific reason for the choice [60, 19], it's just an arbitrary default location in baltic sea.
    const [position, setPosition] = useState([60, 19])

    // useEffect hook to perform side effects. In this case, it's used to update the position of the marker when the address prop changes
    useEffect(() => {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          // console.log(`Latitude: ${lat}, Longitude: ${lon}`);
          setPosition([lat, lon]);
          map.flyTo([lat, lon], 6)
        } else {
          console.error('No results found');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [address]);

  // Render a Marker component at the current position with a Popup component as a child
  return (
    <Marker position={position} icon={DefaultIcon}>
        {/* Pop up when you hover on the Marker displays the Full Address. */}
        <Popup>
            {address}
        </Popup>
    </Marker>
  )
}

// Export the GeoCoderMarker component
export default GeoCoderMarker;