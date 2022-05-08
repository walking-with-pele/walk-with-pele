import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, LongTextField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Spots } from '../../api/spot/Spots';

const bridge = new SimpleSchema2Bridge(Spots.schema);

/** Renders the Page for editing a Spot document. */
class EditSpot extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { name, address, spotType, picture, description, coordinatesX, coordinatesY, _id } = data;
    Spots.collection.update(_id, { $set: { name, address, spotType, picture, description, coordinatesX, coordinatesY } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Spot updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid id="edit-spot-page" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Stuff</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField id='edit-spot-name' name='name'/>
              <TextField id='edit-spot-address' name='address'/>
              <SelectField id='edit-spot-type' name='spotType'/>
              <SelectField id='edit-spot-picture' name='picture'/>
              <LongTextField id='edit-spot-description' name='description'/>
              <NumField id='edit-spot-x' name='coordinatesX'/>
              <NumField id='edit-spot-y' name='coordinatesY'/>
              <SubmitField id='edit-spot-submit' value='Submit'/>
              <ErrorsField/>
              <HiddenField name='owner' />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditSpot.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Spots.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Spots.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditSpot);
