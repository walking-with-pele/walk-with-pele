import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Button, Header, Loader, Card, Image, Menu, Grid, List } from 'semantic-ui-react';
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
class SpotPage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <Header as='h1'>Name of Spot</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={9}>

              <Header as='h3'>Category</Header>
              <p>Address</p>
              <Button>Write a Review</Button>
              <div className="ui labeled button" tabIndex="0">
                <div className="ui button">
                  <i className="heart icon"></i> Like
                </div>
                <a className="ui basic label">
                  # of likes
                </a>
              </div>
              <p>google maps?↓</p>
              <Image size='medium' src='/images/meteor-logo.png'/>
            </Grid.Column>
            <Grid.Column width={7}>
              <Image src='/images/meteor-logo.png'/>
            </Grid.Column>
          </Grid.Row>
          <div className="ui divider"></div>
          <Grid.Row>
            <Header as='h3'>Reviews</Header>
            <List style={{ paddingTop: '20px', paddingBottom: '20px' }}>
              <List.Item style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                <Image size='tiny' src='/images/meteor-logo.png' />
                <List.Content>
                  <List.Description>
                    Review...
                  </List.Description>
                  <List.Description>
                    -Reviewer
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                <Image size='tiny' src='/images/meteor-logo.png' />
                <List.Content>
                  <List.Description>
                    Review...
                  </List.Description>
                  <List.Description>
                    -Reviewer
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                <Image size='tiny' src='/images/meteor-logo.png' />
                <List.Content>
                  <List.Description>
                    Review...
                  </List.Description>
                  <List.Description>
                    -Reviewer
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
SpotPage.propTypes = {
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
})(SpotPage);
