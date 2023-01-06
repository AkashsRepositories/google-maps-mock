import { Loader} from '@googlemaps/js-api-loader';
import { useState } from 'react';
import './App.css';
import logo from './assets/logo.png';
import originLogo from './assets/originLogo.png';
import stopLogo from './assets/stopLogo.png';
import PlusCircle from './assets/plus-circle.png';
import destLogo from './assets/destinationLogo.png';

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
  const [distance, setDistance] = useState("-- kms");

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
        travelMode: 'DRIVING',
        region: "inccu",
      }

      if(stop && stop !== ""){
        directionsRequest.waypoints = [
          {
            location: stop,
            stopover: false,
          }
        ];
      }
    

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
          .catch((e) => window.alert("Check your inputs and try again!"));
      
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
        <h1 className='text-center py-4 font-work_sans text-[#1B31A8]'>Let's calculate <p className="inline font-bold">distance</p> from Google maps</h1>
        <section className='flex h-5/6 w-full'>
          <section id="user-input" className="h-full px-28">
            <section id="inputs" className="flex justify-between items-center">
              <section id="details" className="flex text-sm flex-col gap-6">
                  <label className='flex flex-col'> 
                    Origin
                    <div className='border flex items-center rounded-md border-[#E9EEF2] bg-white'>
                      <img className='h-3 w-3 inline' src={originLogo} alt="origin logo"/>
                      <input  type="text" placeholder='Enter a location' name="origin" value={origin} onChange={(e) => setOrigin(e.target.value)}/>  
                    </div>
                  </label>
                  <div className="flex flex-col">
                    <label className='flex flex-col'>
                      Stop
                      <div className='border flex items-center rounded-md border-[#E9EEF2] bg-white'>
                        <img className='inline h-3 w-3' src={stopLogo} alt="stop logo"/>
                      <input type="text" placeholder='Enter a location' name="stop" value={stop} onChange={(e) => setStop(e.target.value)}/>
                      </div>
                    </label>
                    <button id="add-stop" className="flex justify-center   items-center">
                        <img className="h-4 w-4 inline" src={PlusCircle} alt="plus-circle with border" />
                       Add another stop
                    </button>
                  </div>
                  <label className='flex flex-col'>
                    Destination
                    <div className='flex items-center rounded-md border border-[#E9EEF2] bg-white'>
                      <img className='inline h-4 w-3' src={destLogo} alt="destination logo" />
                      <input type="text" placeholder='Enter a location' name="destination" value={destination} onChange={(e) => setDestination(e.target.value)}/>
                    </div>
                  </label>
              </section>
              <button id='calculate' className='text-white w-36 h-16 font-ibm_sans text-lg font-semibold rounded-[2rem] bg-[#1B31A8]' onClick={calculateDistance}>Calculate</button>
            </section>
            <section id="result" className='w-[30.6rem] h-[9rem] rounded-lg overflow-hidden border border-[#E9EEF2] mt-11'>
              <div className='distance-container bg-white flex justify-between px-5 py-5'>
                <span className='text-xl font-bold'>Distance</span>
                <span id="distance" className='text-3xl font-bold text-[#0079FF]'>{distance}</span>
              </div>
              <h2 className='text-xs text-center px-5 py-5'>
              The distance between <span className='font-bold'>{origin}</span> and <span className='font-bold'>{destination}</span> via the seleted route is <span className='font-bold'>{distance}.</span>
              </h2>
            </section>
          </section>
          <section id="map" className="h-[32rem] w-[35rem]">
            {/* map will be displayed here via api request */}
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
