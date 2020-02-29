import React, { useState, useRef, useEffect } from "react"
// import logo from './logo.svg';
// // import './App.css';
import mapboxgl from "mapbox-gl"

// // setting up mapbox
mapboxgl.accessToken =
  "pk.eyJ1IjoicHJha2hhciIsImEiOiJjaWZlbzQ1M2I3Nmt2cnhrbnlxcTQyN3VkIn0.uOaUAUqN2VS7dC7XKS0KkQ"

function App() {
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 })
  const [zoom, setZoom] = useState(0)
  let mapContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainer.current) {
      throw new Error("s")
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/prakhar/cij2cpsn1004p8ykqqir34jm8",
      center: [latLng.lat, latLng.lng],
      zoom: zoom
    })
  }, [])

  return (
    <div
      ref={mapContainer}
      style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
    ></div>
  )
}

export default App
