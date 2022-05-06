import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Button, Segment, Header, Loader, Label, Image, Grid, Feed, Icon, Popup } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Spots } from '../../api/spot/Spots';
import { Likes } from '../../api/like/Likes';
import { Comments } from '../../api/comment/Comments';
import { VisitedSpots } from '../../api/visitedSpot/VisitedSpots';
import Comment from '../components/Comment';
import AddComment from '../components/AddComment';
import GoogleMapSpot from '../components/GoogleMapSpot';

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

  userVisitedSpot() {
    const data = this.props.visited;
    const visited = true;
    const spotID = this.props.spot._id;
    const owner = Meteor.user().username;

    if (data.some(e => e.spotID === this.props.spot._id)) {
      console.log('page already visited');

      VisitedSpots.collection.update(
        { _id: data[0]._id },
        { $set: { visited: !(data[0].visited) } },
      );
      return;
    }
    VisitedSpots.collection.insert({ visited, spotID, owner });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const likedPage = this.props.like.some(e => e.spotID === this.props.spot._id);
    const visitedPage = this.props.like.some(e => e.spotID === this.props.spot._id);
    return (
      <Container id="spot-page" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <Header as='h1'>{this.props.spot.name}</Header>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
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
              <Button className="ui button" icon labelPosition='right' active={visitedPage} onClick={() => this.userVisitedSpot()}>
                Mark as visited
                <Icon name="user icon"/>
              </Button>
              <Header as='h3'>Map ↓</Header>
              <GoogleMapSpot spot={this.props.spot}/>
            </Grid.Column>
            <Grid.Column>
              <Image src={this.props.spot.picture}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Segment>
              <Header as='h3' floated='left'>Comments</Header>
              <Feed size='large'>
                {_.map(this.props.comments.filter(comment => (comment.spotId === this.props.spot._id)), (comment, index) => <Comment key={index} comment={comment}/>)}
              </Feed>
            </Segment>
          </Grid.Row>
          <Grid.Row>
            <Popup content={<AddComment owner={this.props.spot.owner} spotId={this.props.spot._id}/>} trigger={<Button id='add-comment-popup' icon='comment'/>} hoverable/>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
SpotPage.propTypes = {
  spot: PropTypes.object.isRequired,
  like: PropTypes.array.isRequired,
  visited: PropTypes.object.isRequired,
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
  const visitedSubscription = Meteor.subscribe(VisitedSpots.userPublicationName);
  const commentSubscription = Meteor.subscribe(Comments.userPublicationName);
  const ready = subscription.ready() && likeSubscription.ready() && commentSubscription.ready() && visitedSubscription.ready();
  // Get the Stuff documents
  const spot = Spots.collection.findOne(spotId);
  const like = Likes.collection.find({}).fetch();
  const visited = VisitedSpots.collection.find({}).fetch();
  const comments = Comments.collection.find({}).fetch();
  return {
    spot,
    like,
    visited,
    comments,
    ready,
  };
})(SpotPage);
