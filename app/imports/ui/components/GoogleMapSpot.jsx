import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// Setting the lat and lng of the spot
class MapSpot extends React.Component {
  checkType(spotType) {
    let markerColor = '';
    switch (spotType) {
    case 'beach':
      markerColor = 'https://labs.google.com/ridefinder/images/mm_20_blue.png';
      break;
    case 'hike':
      markerColor = 'https://labs.google.com/ridefinder/images/mm_20_red.png';
      break;
    case 'library':
      markerColor = 'https://labs.google.com/ridefinder/images/mm_20_yellow.png';
      break;
    case 'park':
      markerColor = 'https://labs.google.com/ridefinder/images/mm_20_green.png';
      break;
    default:
      break;
    }
    return markerColor;
  }

  // Render the page once subscriptions have been received.
  render() {
    const WrappedMap = withScriptjs(withGoogleMap(() => <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: this.props.spot.coordinatesX, lng: this.props.spot.coordinatesY }} // map center view
    >
      <Marker icon={{ url: this.checkType(this.props.spot.spotType) }}
        position={{ lat: this.props.spot.coordinatesX, lng: this.props.spot.coordinatesY }}/>
    </GoogleMap>));

    return (
      <div id="map-page"
        style={
          { width: '20vw', height: '20vh' }
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
}

// import functions form the react-google-maps

MapSpot.propTypes = {
  spot: PropTypes.object.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withRouter(MapSpot);
