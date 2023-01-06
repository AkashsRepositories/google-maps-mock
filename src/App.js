import { Loader} from '@googlemaps/js-api-loader';
import { useState } from 'react';
import './App.css';
import logo from './assets/logo.png';

const API_KEY = "AIzaSyAolXVBph__8LXk-JukgnxDUI4LPDQAsxQ";

const loader = new Loader({
  apiKey: API_KEY,
  region: "inccu",
  version: "weekly",
})

let map = null;
loader.load().then(() => {
  map = new window.google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 20.5937, lng: 78.9629 }, // India
  });
});

function App() {
  const [origin, setOrigin] = useState("");
  const [stop, setStop] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState(NaN);

  const calculateDistance = () => {
    //here distance will be calculated using Google maps and map will be shown
    
    //code here
    loader.load().then(() => {
      map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: { lat: 20.5937, lng: 78.9629 }, // India
      });
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRequest = {
        origin,
        destination,
        waypoints: [
          {
            location: stop,
            stopover: true,
          }
        ],
        travelMode: 'DRIVING',
        // waypoints: DirectionsWaypoint,
        region: "inccu",
      }
      // directionsService.route(directionsRequest).then((res) => {
      //     console.log(res);
      // });
      directionsService.route(directionsRequest)
          .then((response) => {
            directionsRenderer.setDirections(response);

            const route = response.routes[0];

            let tempDist = route.legs[0].distance.text;
            // For each route, display summary information.
            for (let i = 1; i < route.legs.length; i++) {
              tempDist +=  route.legs[i].distance.text;
            }

            setDistance(tempDist);
          })
          .catch((e) => window.alert("Directions request failed due to " + e));
      
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        draggable: true,
        map,
        // panel: document.getElementById("panel"),
      });
      console.log(directionsRenderer);
    });
  }

  return (
    <div className='h-screen'>
      <header className='h-20 px-16 flex items-center'>
        <img className="logo w-40 h-[4.3rem]" src={logo} alt="Graviti logo"/>
      </header>
      <main className="App h-full bg-[#F4F8FA]">
        <h1 className='text-center'>Let's calculate <p className="inline font-bold">distance</p> from Google maps</h1>
        <section className='flex h-5/6 w-full'>
          <section id="user-input" className="h-full w-1/2 p-8 border  border-black">
            <section id="inputs" className="flex">
              <section id="details" className="flex flex-col gap-6">
                  <label>
                    Origin
                    <input type="text" name="origin" value={origin} onChange={(e) => setOrigin(e.target.value)}/>
                  </label>
                  <div className="flex flex-col">
                    <label>
                      Stop
                      <input type="text" name="stop" value={stop} onChange={(e) => setStop(e.target.value)}/>
                    </label>
                    <button id="add-stop">➕ Add another stop</button>
                  </div>
                  <label>
                    Destination
                    <input type="text" name="destination" value={destination} onChange={(e) => setDestination(e.target.value)}/>
                  </label>
              </section>
              <button id='calculate' onClick={calculateDistance}>Calculate</button>
            </section>
            <section id="result">
              <div>
                <span>Distance</span>
                <span id="distance">{distance}</span>
              </div>
              <div>
              The distance between {origin} and {destination} via the seleted route is {distance}.
              </div>
            </section>
          </section>
          <section id="map" className="h-full w-1/2 border  border-black">

          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
