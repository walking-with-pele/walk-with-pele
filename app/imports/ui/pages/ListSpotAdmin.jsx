import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SpotAdmin from '../components/SpotAdmin';
import { Spots } from '../../api/spot/Spots';
import { Comments } from '../../api/comment/Comments';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListSpotAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container id="admin-page">
        <Header as="h2" textAlign="center">List Spots (Admin)</Header>
        <Card.Group>
          {this.props.spots.map((spot, index) => <SpotAdmin key={index} spot={spot}
            comments={this.props.comments.filter(comment => (comment.spotId === spot._id))}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListSpotAdmin.propTypes = {
  spots: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Spots.userPublicationName);
  const subscription2 = Meteor.subscribe(Comments.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const spots = Spots.collection.find({}).fetch();
  const comments = Comments.collection.find({}).fetch();
  return {
    spots,
    comments,
    ready,
  };
})(ListSpotAdmin);
