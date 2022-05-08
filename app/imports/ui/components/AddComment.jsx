import React from 'react';
import { Segment } from 'semantic-ui-react';
import { AutoForm, HiddenField, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Comments } from '../../api/comment/Comments';

// Create a schema to specify the structure of the data to appear in the form.
const bridge = new SimpleSchema2Bridge(Comments.schema);

/** Renders the Page for adding a document. */
class AddComment extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { comment, spotId, owner, createdAt } = data;
    Comments.collection.insert({ comment, spotId, owner, createdAt },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Comment added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <div id='add-comment'>
        <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
          <Segment>
            <TextField id='comment-form-text' label="Add Comment" name='comment'/>
            <SubmitField id='comment-form-submit' value='Submit'/>
            <ErrorsField/>
            <HiddenField name='owner' value={this.props.owner}/>
            <HiddenField name='spotId' value={this.props.spotId}/>
            <HiddenField name='createdAt' value={new Date()}/>
          </Segment>
        </AutoForm>
      </div>
    );
  }
}

AddComment.propTypes = {
  owner: PropTypes.string.isRequired,
  spotId: PropTypes.string.isRequired,
};
export default AddComment;
