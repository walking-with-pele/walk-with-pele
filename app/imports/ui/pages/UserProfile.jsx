import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Image, Grid, List } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Spots } from '../../api/spot/Spots';
import SpotForUp from '../components/SpotForUp';
import { Profiles } from '../../api/profile/Profiles';
import { Likes } from '../../api/like/Likes';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    // pull spotIds from likes collection that are liked
    const likedOnes = _.pluck(Likes.collection.find({ like: true }).fetch(), 'spotID');
    const ArrOfSpots = [];
    // pull the spots using the ids of liked collection and add them into array
    likedOnes.forEach(element => { ArrOfSpots.push(Spots.collection.findOne({ _id: element })); });
    return (
      <Container>
        <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <Header as="h2" textAlign="left">User Profile</Header>
        </div>
        <Grid celled style={{ height: '670px' }}>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image size='medium' circular src={this.props.profile.image} />
            </Grid.Column>
            <Grid.Column width={12}>
              <Header as='h1'>{this.props.profile.firstName} {this.props.profile.lastName} </Header>
              <Header as='h3'>{this.props.profile.major}</Header>
              <Header as='h3'>{this.props.profile.bio}</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8} style={{ height: '200px' }}>
              <Header as='h3'>Visited Spots</Header>
              <List style={{ height: '250px', overflow: 'scroll' }}>
                {this.props.spots.map((spot, index) => <SpotForUp key={index} spot={spot}/>)}
              </List>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as='h3'>Liked Spots</Header>
              <List style={{ height: '250px', overflow: 'scroll' }}>
                {ArrOfSpots.map((spot, index) => <SpotForUp key={index} spot={spot}/>)}
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
UserProfile.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    major: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
  spots: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  like: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
// eslint-disable-next-line no-empty-pattern
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Spots.userPublicationName);
  const subscriptionProfile = Meteor.subscribe(Profiles.userPublicationName);
  const likeSubscription = Meteor.subscribe(Likes.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscriptionProfile.ready() && likeSubscription.ready();
  // Get the documents
  const spots = Spots.collection.find({}).fetch();
  const profile = Profiles.collection.findOne();
  const like = Likes.collection.find({}).fetch();
  return {
    like,
    spots,
    profile,
    ready,
  };
})(UserProfile);
