import React from 'react';
import { Card, Feed, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Comment from '../components/Comment';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Spot extends React.Component {
  render() {
    const cardStyle = {
      boxShadow: '5px 5px 10px 2px rgba(56, 125, 255, 0.17)',
    };
    return (
      <Card centered style={cardStyle}>
        <Image label={{
          as: 'a',
          color: 'green',
          content: `${this.props.spot.spotType}`,
          ribbon: true,
        }} src={this.props.spot.picture} wrapped/>
        <Card.Content>
          <Card.Header>{this.props.spot.name}</Card.Header>
          <Card.Meta>{this.props.spot.address}</Card.Meta>
        </Card.Content>
        <Card.Content>
          <Button id='view-page' className="ui button" as={Link} to={`/spot-page/${this.props.spot._id}`}>
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
            {this.props.comments.map((comment, index) => <Comment key={index} comment={comment}/>)}
          </Feed>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Spot.propTypes = {
  spot: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Spot);
