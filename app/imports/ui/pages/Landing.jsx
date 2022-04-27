import React from 'react';
import { Grid, Image, Header, Container, GridRow, Segment, Card, Icon, Label } from 'semantic-ui-react';
import '../../../client/style.css';
/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const LandingStyle = {
      backgroundImage: 'url(images/UHManoa.jpg)',
      backgroundSize: '100% auto',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      display: 'flexed',
      justifyContent: 'center',
      alignItems: 'center',
      height: '500px',
      width: '100vw',
    };
    const textstyle = {
      color: 'white',
      fontWeight: '700',
      fontSize: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
      textAlign: 'center',
    };
    const uhmName = {
      width: '80vw',
      margin: 'auto',
      height: '125px',
      marginTop: '10px',
      marginBottom: '10px',
    };
    const cardStyle = {
      boxShadow: '0 6px 20px rgba(56, 125, 255, 0.17)',
    };
    return (
      <div>
        <div style={uhmName}>
          <Image src={'images/uhm-name.png'} alt="uhm-name"/>
        </div>
        <Grid style={LandingStyle} columns={2}>
          <Grid.Column style={textstyle}>
            <Image
              src='images/AlohaText.png'
              size='large'
            />
          </Grid.Column>

          <Grid.Column>
            <Header as='h1' style={textstyle} inverted>Walking with Pele</Header>
            <Header as='h3' style={textstyle} inverted>Create Our own Stories</Header>
          </Grid.Column>
        </Grid>
        <Grid style={{ width: '90%', margin: 'auto', marginTop: '50px' }}>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Card style={cardStyle} centered>
                <Image label={{
                  as: 'a',
                  color: 'red',
                  content: 'Food',
                  icon: 'spoon',
                  ribbon: true,
                }}
                src='https://pibig.info/uploads/posts/2021-05/1621518136_16-pibig_info-p-virginskie-ostrova-priroda-krasivo-foto-18.jpg'
                wrapped ui={false}
                />
                <Card.Content>
                  <Card.Header>Matthew</Card.Header>
                  <Card.Meta>
                    <span className='date'>Joined in 2015</span>
                  </Card.Meta>
                  <Card.Description>
                    Matthew is a musician living in Nashville.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    22 Friends
                  </a>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card style={cardStyle} label="Beach" centered>
                <Image label={{
                  as: 'a',
                  color: 'red',
                  content: 'Food',
                  icon: 'spoon',
                  ribbon: true,
                }}
                src='https://pibig.info/uploads/posts/2021-05/1621518136_16-pibig_info-p-virginskie-ostrova-priroda-krasivo-foto-18.jpg'
                wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Matthew</Card.Header>
                  <Card.Meta>
                    <span className='date'>Joined in 2015</span>
                  </Card.Meta>
                  <Card.Description>
                    Matthew is a musician living in Nashville.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    22 Friends
                  </a>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card style={cardStyle} centered>
                <Image label={{
                  as: 'a',
                  color: 'red',
                  content: 'Food',
                  icon: 'spoon',
                  ribbon: true,
                }}
                src='https://pibig.info/uploads/posts/2021-05/1621518136_16-pibig_info-p-virginskie-ostrova-priroda-krasivo-foto-18.jpg'
                wrapped ui={false}/>
                <Card.Content>
                  <Card.Header>Matthew</Card.Header>
                  <Card.Meta>
                    <span className='date'>Joined in 2015</span>
                  </Card.Meta>
                  <Card.Description>
                    Matthew is a musician living in Nashville.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    22 Friends
                  </a>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={4}>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Landing;
