import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

// 📌 Определяме размер на картата
const containerStyle = {
  width: "100%",
  height: "400px",
};

// ❗ Хардкоднати координати
const center = {
  lat: 38.733792,
  lng: -120.7404881,
};

const GoogleMapComponent = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false); // ✅ Следим дали API-то е заредено

  // 📌 Функция, която се изпълнява, когато Google Maps API е зареден
  const handleApiLoad = () => {
    console.log("✅ Google Maps API Loaded!");
    setIsApiLoaded(true);
  };

  useEffect(() => {
    if (!isApiLoaded) return; // ✅ Чакаме API-то да се зареди

    if (!window.google || !window.google.maps || !window.google.maps.marker) {
      console.error("❌ Google Maps API is still not available!");
      return;
    }

    const { AdvancedMarkerElement } = window.google.maps.marker;

    if (mapRef.current) {
      // 📌 Премахваме стария маркер, ако има такъв
      if (markerRef.current) {
        markerRef.current.map = null;
      }

      // 📌 Създаваме нов AdvancedMarkerElement
      markerRef.current = new AdvancedMarkerElement({
        position: center,
        map: mapRef.current,
        title: "Our Location 📍",
      });

      console.log("✅ AdvancedMarkerElement added!", markerRef.current);
    }
  }, [isApiLoaded]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyByICmq7HOF_FubUpXSZOFZXQaQLRFHSVg" libraries={["marker"]}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={(map) => (mapRef.current = map)}
      />
    </LoadScript>
  );
};

export default GoogleMapComponent;








//
//

//
//
