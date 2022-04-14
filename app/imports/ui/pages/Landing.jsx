import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container columns={3}>
          <Grid.Column>
            <Image
              src='images/pele.jpg'
              as='a'
              size='small'
              href='/'
              target='_blank'
            />
          </Grid.Column>

          <Grid.Column>
            <Header as='h1'>Walking with Pele</Header>
            <Header as='h3'>Helping UH Students create their own stories</Header>
          </Grid.Column>

          <Grid.Column>
            <Image
              src='images/pele.jpg'
              as='a'
              size='small'
              href='/'
              target='_blank'
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Landing;
