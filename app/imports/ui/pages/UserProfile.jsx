import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Image, Grid, List } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Spots } from '../../api/spot/Spots';
import SpotForUp from '../components/SpotForUp';
import { Profiles } from '../../api/profile/Profiles';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <Header as="h2" textAlign="left">User Profile</Header>
        </div>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image circular src='/images/meteor-logo.png' />
            </Grid.Column>
            <Grid.Column width={12}>
              <Header as='h3'>name</Header>
              <Header as='h3'>major</Header>
              <Header as='h3'>bio</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3'>Visited Spots</Header>
              <List>
                {this.props.spots.map((spot, index) => <SpotForUp key={index} spot={spot}/>)}
              </List>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as='h3'>Liked Spots</Header>
              <List>
                <List.Item>
                  <Image size='tiny' src='/images/meteor-logo.png' />
                  <List.Content>
                    <List.Header as='a'>Name of Spot</List.Header>
                    <List.Description>
                      Address
                    </List.Description>
                    <List.Description>
                      Category
                    </List.Description>
                    <List.Description>
                      Date Visited
                    </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Image size='tiny' src='/images/meteor-logo.png' />
                  <List.Content>
                    <List.Header as='a'>Name of Spot</List.Header>
                    <List.Description>
                      Address
                    </List.Description>
                    <List.Description>
                      Category
                    </List.Description>
                    <List.Description>
                      Date Visited
                    </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Image size='tiny' src='/images/meteor-logo.png' />
                  <List.Content>
                    <List.Header as='a'>Name of Spot</List.Header>
                    <List.Description>
                      Address
                    </List.Description>
                    <List.Description>
                      Category
                    </List.Description>
                    <List.Description>
                      Date Visited
                    </List.Description>
                  </List.Content>
                </List.Item>
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
    owner: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
  spots: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  //const profileId = match.params._id;
  //console.log(profileId);
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Spots.userPublicationName);
  const subscriptionProfile = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscriptionProfile.ready();
  // Get the Stuff documents
  const spots = Spots.collection.find({}).fetch();
  const profile = Profiles.collection.find({}).fetch();
  return {
    spots,
    profile,
    ready,
  };
})(UserProfile);
