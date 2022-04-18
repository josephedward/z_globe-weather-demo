import React, { useState, useEffect, useMemo } from "react";
import Globe from "react-globe.gl";
import * as d3 from "d3";
import axios from "axios";

export default function World() {
  const { useState, useEffect } = React;

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // load data
    fetch(
      "https://raw.githubusercontent.com/geopython/pygeoapi/master/tests/data/ne_110m_populated_places_simple.geojson"
    )
      .then((res) => res.json())
      .then(({ features }) => setPlaces(features));
  }, []);

  const weightColor = d3
    .scaleSequentialSqrt(d3.interpolateYlOrRd)
    .domain([0, 1e7]);
  const key = "d3104375bd592736cf8775886538ee2a";
  const key2 = "cf002751564a4c78f5f7ed479f1b9ba3";
  const key3 = "8c0326299f8d80cbd3754a056ea0a68e";

  let coords
  let lat 
  let lon  
  let temps=[]
  const axios = require("axios");

  const options = {
    method: 'GET',
    url: 'https://weatherinfo.p.rapidapi.com/api/weather/',
    params: {longitude: '-94.35', latitude: '45.06'},
    headers: {
      'X-RapidAPI-Host': 'weatherinfo.p.rapidapi.com',
      'X-RapidAPI-Key': 'b1ca2090c8mshbe1c0739a807645p1f2242jsn5f4cb0ed4eb5'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });


  for (let x of Object.entries(places)) {
    coords = x[1].geometry.coordinates;
    lat = coords[1];
    lon = coords[0];
    options.params = {longitude: lon, latitude: lat};

    axios.request(options).then(function (response) {
      console.log(response.data);
      
    }).catch(function (error) {
      console.error(error);
    });
  
  }
  
  console.log(temps)

  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      pointsData={places}
      pointLabel={(d) => d.properties.name}
      pointLat={(d) => d.geometry.coordinates[1]}
      pointLng={(d) => d.geometry.coordinates[0]}
      // pointAltitude={(d) => Math.sqrt(res.data.main.temp? res.data.main.temp:0) * 4e-4}
      pointAltitude={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
      // labelsData={places}
      // labelLat={d => d.properties.latitude}
      // labelLng={d => d.properties.longitude}
      labelText={d => d.properties.name}
      // labelSize={d => Math.sqrt(d.properties.pop_max) * 4e-4}
      // labelDotRadius={d => Math.sqrt(d.properties.pop_max) * 4e-4}
      // labelColor={() => 'rgba(255, 165, 0, 0.75)'}

      //   hexBinPointsData={places}
      // hexBinPointWeight="pop_max"
      // hexAltitude={d => Math.sqrt(d.properties.pop_max) * 4e-4}
      // hexBinResolution={4}
      // hexTopColor={d => weightColor(d.sumWeight)}
      // hexSideColor={d => weightColor(d.sumWeight)}
      // hexBinMerge={true}

      //   labelResolution={2}
    />
  );


  // const { useState, useEffect, useRef } = React;

  // const World = () => {
  //   const globeEl = useRef();
  //   const [popData, setPopData] = useState([]);

  //   useEffect(() => {
  //     // load data
  //     fetch('https://raw.githubusercontent.com/geopython/pygeoapi/master/tests/data/ne_110m_populated_places_simple.geojson').then(res => res.text())
  //       .then(csv => d3.csvParse(csv, ({ lat, lng, pop }) => ({ lat: +lat, lng: +lng, pop: +pop })))
  //       .then(setPopData);
  //   }, []);

  //   useEffect(() => {
  //     // Auto-rotate
  //     globeEl.current.controls().autoRotate = true;
  //     globeEl.current.controls().autoRotateSpeed = 0.1;
  //   }, []);

  //     const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd)
  //       .domain([0, 1e7]);

  //     return <Globe
  //       // ref={globeEl}
  //       globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
  //       bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
  //       backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

  //       hexBinPointsData={places}
  //       hexBinPointWeight="pop_max"
  //       hexAltitude={d => Math.sqrt(d.properties.pop_max) * 4e-4}
  //       hexBinResolution={4}
  //       hexTopColor={d => weightColor(d.sumWeight)}
  //       hexSideColor={d => weightColor(d.sumWeight)}
  //       hexBinMerge={true}
  //       enablePointerInteraction={false}
  //     />;
}
