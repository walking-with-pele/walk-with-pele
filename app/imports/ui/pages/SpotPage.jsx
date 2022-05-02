import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Button, Header, Loader, Label, Image, Grid, Feed, Icon, Popup } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Spots } from '../../api/spot/Spots';
import { Likes } from '../../api/like/Likes';
import { Comments } from '../../api/comment/Comments';
import Comment from '../components/Comment';
import AddComment from '../components/AddComment';

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
      <Container id="spot-page" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <Header as='h1'>{this.props.spot.name}</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={9}>
              <Label size='large' color='green'>{this.props.spot.spotType}</Label>
              <Header as='h3'>{this.props.spot.address}</Header>
              <div className="ui labeled button" tabIndex="0">
                <Button className="ui button" icon labelPosition='right' active={likedPage} onClick={() => this.userLikesSpot()}>
                  Like
                  <Icon name="heart"/>
                </Button>
                <Label as='a' basic>
                  {this.props.spot.likes}
                </Label>
              </div>
              <Header as='h4'>google maps?↓</Header>
              <Image size='medium' src={this.props.spot.imageAddress}/>
            </Grid.Column>
            <Grid.Column width={7}>
              <Image src={this.props.spot.picture}/>
            </Grid.Column>
          </Grid.Row>
          <Header as='h3' floated='left'>Comments</Header>
          <Grid.Row>
            <Feed>
              {_.map(this.props.comments.filter(comment => (comment.spotId === this.props.spot._id)), (comment, index) => <Comment key={index} comment={comment}/>)}
            </Feed>
          </Grid.Row>
          <Grid.Row>
            <Popup content={<AddComment owner={this.props.spot.owner} spotId={this.props.spot._id}/>} trigger={<Button icon='comment'/>} hoverable/>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
SpotPage.propTypes = {
  spot: PropTypes.object.isRequired,
  like: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const spotId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Spots.userPublicationName);
  // Determine if the subscription is ready
  const likeSubscription = Meteor.subscribe(Likes.userPublicationName);
  const commentSubscription = Meteor.subscribe(Comments.userPublicationName);
  const ready = subscription.ready() && likeSubscription.ready() && commentSubscription.ready();
  // Get the Stuff documents
  const spot = Spots.collection.findOne(spotId);
  const like = Likes.collection.find({}).fetch();
  const comments = Comments.collection.find({}).fetch();
  return {
    spot,
    like,
    comments,
    ready,
  };
})(SpotPage);
