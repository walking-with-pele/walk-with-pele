import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Segment, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SpotAdmin from '../components/SpotAdmin';
import { Spots } from '../../api/spot/Spots';
import { Comments } from '../../api/comment/Comments';

const searchSchema = new SimpleSchema({
  searchBy: {
    type: String,
    allowedValues: ['name', 'address', 'spotType'],
    defaultValue: 'name',
  },
  containing: String,
});

const bridge = new SimpleSchema2Bridge(searchSchema);

/** Renders a Card group containing all Spots documents. */
class ListSpotAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: null,
    };
  }

  renderCards() {
    // const allSpots = this.props.spots;
    if (this.state.searchResults == null) {
      return this.props.spots.map((spot, index) => <SpotAdmin key={index} spot={spot}
        comments={this.props.comments.filter(comment => (comment.spotId === spot._id))}/>);
    }
    return this.state.searchResults.map((spot, index) => <SpotAdmin key={index} spot={spot}
      comments={this.props.comments.filter(comment => (comment.spotId === spot._id))}/>);
  }

  search(type, content) {
    let search = this.props.spots;
    const modContent = content.toLowerCase();
    search = search.filter(data => (data[type]).toLowerCase().includes(modContent));
    this.setState({ searchResults: search });
  }

  resetSearch() {
    this.setState({ searchResults: null });
  }

  submitSearch(data) {
    this.search(data.searchBy, data.containing);
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    let fRef = null;
    return (
      <Container id="admin-page">
        <Header as="h2" textAlign="center">List Spots (Admin)</Header>
        <div style={{ paddingBottom: '5px' }}>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submitSearch(data, fRef)} >
            <Segment>
              <SelectField id='search-form-filter' name='searchBy'/>
              <TextField id='search-form-text' name='containing'/>
              <SubmitField id='search-form-submit' value='Search'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>

          <Button onClick={() => this.resetSearch()}>Reset Search</Button>
        </div>
        <Card.Group>
          {this.renderCards()}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Spots documents in the props.
ListSpotAdmin.propTypes = {
  spots: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Spots documents.
  const subscription = Meteor.subscribe(Spots.userPublicationName);
  const subscription2 = Meteor.subscribe(Comments.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Spots documents
  const spots = Spots.collection.find({}).fetch();
  const comments = Comments.collection.find({}).fetch();
  return {
    spots,
    comments,
    ready,
  };
})(ListSpotAdmin);
