import React from 'react';
import { Card, Feed, Button, Image } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Comment from '../components/Comment';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SpotAdmin extends React.Component {
  checkType(spotType) {
    let labelColor = '';
    switch (spotType) {
    case 'beach':
      labelColor = 'blue';
      break;
    case 'hike':
      labelColor = 'red';
      break;
    case 'library':
      labelColor = 'yellow';
      break;
    case 'park':
      labelColor = 'green';
      break;
    default:
      break;
    }
    return labelColor;
  }

  render() {
    const cardStyle = {
      boxShadow: '5px 5px 10px 2px rgba(56, 125, 255, 0.17)',
    };
    return (
      <Card centered style={cardStyle}>
        <Image label={{
          as: 'a',
          color: `${this.checkType(this.props.spot.spotType)}`,
          content: `${this.props.spot.spotType}`,
          ribbon: true,
        }} src={this.props.spot.picture} wrapped/>
        <Card.Content>
          <Card.Header>{this.props.spot.name}</Card.Header>
          <Card.Meta>{this.props.spot.address}</Card.Meta>
        </Card.Content>
        <Card.Content>
          <Card.Description>
            {this.props.spot.description}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Button className="ui button" as={Link} to={`/spot-page/${this.props.spot._id}`}>
                  View Page
          </Button>
        </Card.Content>
        <Card.Content>
                Likes: {this.props.spot.likes}
        </Card.Content>
        <Card.Content>
                Added by {this.props.spot.owner}
        </Card.Content>
        <Card.Content extra>
          <Card.Header>Comments</Card.Header>
          <Feed>
            {(this.props.comments.length > 0) ? _.sample(this.props.comments.map((comment, index) => <Comment key={index} comment={comment}/>)) : 'No Comments'}
          </Feed>
        </Card.Content>
        <Card.Content extra>
          <Link id="edit-spot" to={`/edit/${this.props.spot._id}`}>Edit</Link>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
SpotAdmin.propTypes = {
  spot: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(SpotAdmin);
