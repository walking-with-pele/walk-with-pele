import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';

// Seting the lat and lng of the spot
class Map extends React.Component {
  render() {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 21.315603, lng: -157.858093 }} // map center view
      >
        <Marker
          icon={{
            url: 'http://labs.google.com/ridefinder/images/mm_20_red.png',
          }}
          position={{
            lat: 21.3188889, lng: -157.9047222,
          }} // Beginner Sailing
        />
        <Marker
          icon={{
            url: 'http://labs.google.com/ridefinder/images/mm_20_black.png',
          }}
          position={{
            lat: 21.264007, lng: -157.804318,
          }} // Beginning Surfing
        />
        <Marker
          icon={{
            url: 'http://labs.google.com/ridefinder/images/mm_20_blue.png',
          }}
          position={{
            lat: 21.330790, lng: -157.687088,
          }} // Stand-Up Paddling
        />
        <Marker
          icon={{
            url: 'http://labs.google.com/ridefinder/images/mm_20_yellow.png',
          }}
          position={{
            lat: 21.306675, lng: -157.879145,
          }} // Body Boarding
        />
        <Marker
          icon={{
            url: 'http://labs.google.com/ridefinder/images/mm_20_green.png',
          }}
          position={{
            lat: 21.262127, lng: -157.703867,
          }} // Beginning Hiking
        />
        <Marker
          icon={{
            url: 'http://labs.google.com/ridefinder/images/mm_20_orange.png',
          }}
          position={{
            lat: 21.39661392, lng: -157.731385794,
          }} // Kayaking Excursions
        />
        <Marker
          icon={{
            url: 'http://labs.google.com/ridefinder/images/mm_20_white.png',
          }}
          position={{
            lat: 21.300286, lng: -157.816174,
          }} // Hamilton Library
        />
        <Marker
          icon={{
            url: 'http://labs.google.com/ridefinder/images/mm_20_brown.png',
          }}
          position={{
            lat: 21.296285, lng: -157.816770,
          }} // William S Richardson Law Library
        />
        <Marker
          icon={{
            url: 'http://labs.google.com/ridefinder/images/mm_20_purple.png',
          }}
          position={{
            lat: 21.5233333, lng: -157.8402778,
          }} // ATV Raptor Tour
        />
        <Marker
          icon={{
            url: 'http://labs.google.com/ridefinder/images/mm_20_gray.png',
          }}
          position={{
            lat: 21.254947, lng: -157.807105,
          }} // Oahu Circle Island and Snorkeling Tour
        />
        <Marker
          icon={{
            url: 'http://www.google.com/mapfiles/markerA.png',
          }}
          position={{
            lat: 21.3102778, lng: -157.8686111,
          }} // Star Casual Sunset and Show Cruise
        />
        <Marker
          icon={{
            url: 'http://www.google.com/mapfiles/markerZ.png',
          }}
          position={{
            lat: 21.285405, lng: -157.708300,
          }} // Oahu Submarine Scooter Adventure
        />
      </GoogleMap>
    );
  }
}

// import functions form the react-google-maps
const WrappedMap = withScriptjs(withGoogleMap(Map));

// defines the view div of the google map
export default function App() {
  return (
    <div
      style={
        { width: '100vw', height: '100vh' }
      }>
      <WrappedMap
        googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA1wrzzbc00syIBFmXnoG4cFaHvyMVMCm0'}
        loadingElement={<div style={{ height: '100%' }}/>}
        containerElement={<div style={{ height: '100%' }}/>}
        mapElement={<div style={{ height: '100%' }}/>}
      />
    </div>
  );
}
