import React from 'react';
import { Image, Label, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single spot in the UserProfile lists. See pages/UserProfile.jsx. */
class SpotForUp extends React.Component {
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
    return (
      <List.Item>
        <Image size='tiny' src={this.props.spot.picture} />
        <List.Content>
          <List.Header as={Link} to={`/spot-page/${this.props.spot._id}`}>{this.props.spot.name}</List.Header>
          <List.Description>
            {this.props.spot.address}
          </List.Description>
          <Label size='tiny' color={`${this.checkType(this.props.spot.spotType)}`}>{this.props.spot.spotType}</Label>
        </List.Content>
      </List.Item>
    );
  }
}

// Require a document to be passed to this component.
SpotForUp.propTypes = {
  spot: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(SpotForUp);
