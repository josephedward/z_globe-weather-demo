import logo from './logo.svg';
import './App.css';

import { layer, Globe, terrain } from './og.esm.js'
const { XYZ } = layer
const { GlobusTerrain } = terrain

const osm = new XYZ("OpenStreetMap", {
  isBaseLayer: true,
  url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  visibility: true,
})

const Globus = new Globe({
  target: "globus", // a HTMLDivElement which its id is `globus`
  name: "Earth",
  terrain: new GlobusTerrain(),
  layers: [osm],
  autoActivated: true,
  viewExtent: [5.56707, 45.15679, 5.88834, 45.22260]
})




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Globus />
      
    </div>
  );
}

export default App;
