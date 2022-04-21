import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Spot extends React.Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          <Card.Header>{this.props.spot.name}</Card.Header>
          <Card.Meta>{this.props.spot.address}</Card.Meta>
          <Card.Description>
            {this.props.spot.spotType}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          {this.props.spot.likes}
        </Card.Content>
        <Card.Content>
          Added by {this.props.spot.owner}
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Spot.propTypes = {
  spot: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    owner: PropTypes.string,
    spotType: PropTypes.string,
    likes: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Spot);
