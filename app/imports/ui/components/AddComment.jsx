import React from 'react';
import { Segment } from 'semantic-ui-react';
import { AutoForm, HiddenField, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Comments } from '../../api/comment/Comments';

// Create a schema to specify the structure of the data to appear in the form.
const bridge = new SimpleSchema2Bridge(Comments.schema);

/** Renders the Page for adding a document. */
class AddComment extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, address, spotType } = data;
    const owner = Meteor.user().username;
    Comments.collection.insert({ name, address, spotType, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
        <Segment>
          <TextField label="Add comment" name='comment'/>
          <SubmitField value='Submit'/>
          <ErrorsField/>
          <HiddenField name='owner' value={this.props.owner}/>
          <HiddenField name='spotId' value={this.props.spotId}/>
          <HiddenField name='createdAt' value={new Date()}/>
        </Segment>
      </AutoForm>
    );
  }
}

AddComment.propTypes = {
  owner: PropTypes.string.isRequired,
  spotId: PropTypes.string.isRequired,
};
export default AddComment;
