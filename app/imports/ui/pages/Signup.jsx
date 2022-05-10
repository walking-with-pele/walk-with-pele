import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '../../api/profile/Profiles';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', major: '', bio: '', image: '', email: '', password: '', error: '', redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { firstName, lastName, major, bio, image, email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        Profiles.collection.insert({ firstName, lastName, major, bio, image, owner: email },
          (error) => {
            if (error) {
              this.setState({ error: error.reason });
            } else {
              this.setState({ error: '', redirectToReferer: true });
            }
          });
      }
    });
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/user' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container id="signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
                Create an Account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="First Name"
                  id="signup-form-fName"
                  icon="user"
                  iconPosition="left"
                  name="firstName"
                  type="string"
                  placeholder="First Name"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Last Name"
                  id="signup-form-lName"
                  icon="user"
                  iconPosition="left"
                  name="lastName"
                  type="string"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Major"
                  id="signup-form-major"
                  icon="address card"
                  iconPosition="left"
                  name="major"
                  type="string"
                  placeholder="Major"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Bio"
                  id="signup-form-bio"
                  icon="align justify"
                  iconPosition="left"
                  name="bio"
                  type="string"
                  placeholder="Bio"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Image (optional)"
                  id="signup-form-image"
                  icon="camera"
                  iconPosition="left"
                  name="image"
                  type="string"
                  placeholder="Image"
                  onChange={this.handleChange}
                />

                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signup-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Button id="signup-form-submit" content="Submit"/>
              </Segment>
            </Form>
            <Message>
                Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
