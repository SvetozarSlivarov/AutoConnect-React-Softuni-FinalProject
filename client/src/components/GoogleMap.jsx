import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: '100%',
  height: "400px",
};

const center = {
  lat: 38.733792, // Пример: София
  lng: -120.7404881,
};

const GoogleMapComponent = () => {
  return (
    <LoadScript googleMapsApiKey= 'AIzaSyByICmq7HOF_FubUpXSZOFZXQaQLRFHSVg'>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;