import React from 'react';
import { Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Spot extends React.Component {
  render() {
    return (
      <List.Item>
        <Image size='tiny' src='/images/meteor-logo.png' />
        <List.Content>
          <List.Header as={Link} to={`/spot-page/${this.props.spot._id}`}>{this.props.spot.name}</List.Header>
          <List.Description>
            {this.props.spot.address}
          </List.Description>
          <List.Description>
            {this.props.spot.spotType}
          </List.Description>
          <List.Description>
            Date Visited
          </List.Description>
        </List.Content>
      </List.Item>
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
