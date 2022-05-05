import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Profiles } from '../../api/profile/Profiles';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  major: String,
  bio: String,
  image: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

class CreateProfile extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', major: '', bio: '', image: '', error: '', redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit(data, formRef) {
    const { firstName, lastName, major, bio, image } = data;
    const owner = Meteor.user().username;
    Profiles.collection.insert({ firstName, lastName, major, bio, image, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    let fRef = null;
    return (
      <Grid id="add-Profile-page" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Profile</Header>
          <AutoForm id='add-profile-form' ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField id='profile-form-firstName' name='firstName'/>
              <TextField id='profile-form-lastName' name='lastName'/>
              <TextField id='profile-form-major' name='major'/>
              <TextField id='profile-form-bio' name='bio'/>
              <TextField id='profile-form-image' name='image'/>
              <SubmitField id='profile-form-submit' value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
CreateProfile.propTypes = {
  location: PropTypes.object,
};

export default CreateProfile;
