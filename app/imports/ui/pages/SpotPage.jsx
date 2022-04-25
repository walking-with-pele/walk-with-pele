import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Button, Header, Loader, Label, Image, Grid, List } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Spots } from '../../api/spot/Spots';

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

  incrementMe = () => {
    Spots.collection.update();
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <Header as='h1'>{this.props.spot.name}</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={9}>

              <Header as='h3'>{this.props.spot.spotType}</Header>
              <p>{this.props.spot.address}</p>
              <Button>Write a Review</Button>
              <div className="ui labeled button" tabIndex="0">
                <Button className="ui button">
                  <i className="heart icon"></i> Like
                </Button>
                <Label as='a' basic>
                  {this.props.spot.likes}
                </Label>
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
  spot: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    owner: PropTypes.string,
    spotType: PropTypes.string,
    likes: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const spotId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Spots.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const spot = Spots.collection.findOne(spotId);
  return {
    spot,
    ready,
  };
})(SpotPage);
