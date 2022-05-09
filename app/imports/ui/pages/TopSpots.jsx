import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Spots } from '../../api/spot/Spots';
import Spot from '../components/Spot';
import { Comments } from '../../api/comment/Comments';

/** Renders 3 Cards containing the Spots with the most likes. */
class TopSpots extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    // finds the top 3 most liked spots in the collection
    const topThreeSpots = _.first((_.sortBy(this.props.spots, 'likes')).reverse(), 3);
    const allSpots = topThreeSpots.map((spot, index) => <Spot key={index} spot={spot}
      comments={this.props.comments.filter(comment => (comment.spotId === spot._id))}/>);

    return (
      <Container id="top-spots-page">
        <Header as="h2" textAlign="center">Top 3 Spots</Header>
        <Card.Group>
          {allSpots}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Spots documents in the props.
TopSpots.propTypes = {
  spots: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Spot documents.
  const subscription = Meteor.subscribe(Spots.userPublicationName);
  const subscription2 = Meteor.subscribe(Comments.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Spot documents
  const spots = Spots.collection.find({}).fetch();
  const comments = Comments.collection.find({}).fetch();
  return {
    spots,
    comments,
    ready,
  };
})(TopSpots);
