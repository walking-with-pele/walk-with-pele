import React from 'react';
import { Container, Header, Grid, Form, Button, Input } from 'semantic-ui-react';

class Reset extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <h1>
            Forgot Your Password?
          </h1>
        </Header>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <p>
                {/* eslint-disable-next-line max-len */}
                Enter the email address associated with your account in the text field to the right. We will then send an email to that address containing a link that will redirect you to a page where you can reset the password for your account. This link will expire within five minutes.
              </p>
              <p>
                If you do not remember the email address associated with your account, send an email to Admin@foo.com and one of our admin will help you restore your account.
              </p>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <Input label='Email'/>
                </Form.Field>
                <Form.Field>
                  <Button>Submit</Button>
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Reset;
