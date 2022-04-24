import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Dropdown, Header, Loader, Card, Image, Menu, Grid, List } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import { Link } from 'react-router-dom';

/*
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Image size='large' src='/images/meteor-logo.png'/>
      <Card.Header>Spot Name</Card.Header>
      <Card.Meta>
        <span className='date'>spot category</span>
      </Card.Meta>
      <Card.Description>
        Description of place
      </Card.Description>
    </Card.Content>
  </Card>
);

const options = [
  { text: 'My Spots', value: 1 },
  { text: 'Liked Spots', value: 2 },
  { text: 'Visited Spots', value: 3 },
];

const defVal = 1;
 */

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
              <Header as='h3'>FirstName LastName</Header>
              <Header as='h3'>Major</Header>
              <Header as='h3'>Hobbies/Bio</Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3'>Visited Spots</Header>
              <List>
                <List.Item>
                  <Image size='tiny' src='/images/meteor-logo.png' />
                  <List.Content>
                    <List.Header as={Link} to={'/spot-page'}>Name of Spot</List.Header>
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
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();
  return {
    stuffs,
    ready,
  };
})(UserProfile);
