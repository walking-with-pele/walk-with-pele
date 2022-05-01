import React from 'react';
import { Meteor } from 'meteor/meteor';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import { Spots } from '../../api/spot/Spots';

function checkType(spotType) {
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
  console.log(markerColor);
  return markerColor;
}

// Setting the lat and lng of the spot
class Map extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const WrappedMap = withScriptjs(withGoogleMap(() => <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 21.315603, lng: -157.858093 }} // map center view
    >
      {this.props.spots.map((spot, index) => <Marker key={index} icon={{ url: checkType(spot.spotType) }} position={{ lat: spot.coordinatesX, lng: spot.coordinatesY }}/>)}
    </GoogleMap>));

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
}

// import functions form the react-google-maps

Map.propTypes = {
  spots: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Spots.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const spots = Spots.collection.find({}).fetch();
  return {
    spots,
    ready,
  };
})(Map);
