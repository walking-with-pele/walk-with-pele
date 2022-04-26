import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Button, Header, Loader, Label, Image, Grid, List } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Spots } from '../../api/spot/Spots';
import { Likes } from '../../api/like/Likes';

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
  { text: 'My Likes', value: 1 },
  { text: 'Liked Likes', value: 2 },
  { text: 'Visited Likes', value: 3 },
];

const defVal = 1;
 */

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class SpotPage extends React.Component {

  incrementMe = () => {
    Spots.collection.update();
  }

  userLikesSpot() {
    let data = this.props.like;
    const like = true;
    const spotID = this.props.spot._id;
    const owner = Meteor.user().username;

    if (data.some(e => e.spotID === this.props.spot._id)) {
      console.log('page already liked');
      data = data.filter(e => e.spotID === this.props.spot._id); // looks for like that matches user to this page

      if (data[0].like) {
        Spots.collection.update({ _id: this.props.spot._id }, { $set: { likes: this.props.spot.likes - 1 } });
      } else {
        Spots.collection.update({ _id: this.props.spot._id }, { $set: { likes: this.props.spot.likes + 1 } });
      }

      Likes.collection.update(
        { _id: data[0]._id },
        { $set: { like: !(data[0].like) } },
      );
      return;
    }
    Likes.collection.insert({ like, spotID, owner });
    Spots.collection.update({ _id: this.props.spot._id }, { $set: { likes: this.props.spot.likes + 1 } });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const likedPage = this.props.like.some(e => e.spotID === this.props.spot._id);
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
                <Button className="ui button" active={likedPage} onClick={() => this.userLikesSpot()}>
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
  like: PropTypes.shape({
    like: PropTypes.bool,
    owner: PropTypes.string,
    spotID: PropTypes.string,
    _id: PropTypes.string,
    some: PropTypes.any, // not sure why
    filter: PropTypes.any, // not sure why
  }).isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const spotId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Spots.userPublicationName);
  // Determine if the subscription is ready
  const likeSubscription = Meteor.subscribe(Likes.userPublicationName);
  const ready = subscription.ready() && likeSubscription.ready();
  // Get the Stuff documents
  const spot = Spots.collection.findOne(spotId);
  const like = Likes.collection.find({}).fetch();
  return {
    spot,
    like,
    ready,
  };
})(SpotPage);
