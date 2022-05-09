import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import '../../../client/style.css';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const landingStyle = {
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
    const textStyle = {
      color: 'white',
      fontWeight: '700',
      fontSize: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
      textAlign: 'center',
      textShadow: '2px 2px 4px black',
    };
    const textStyle2 = {
      color: 'white',
      fontWeight: '700',
      fontSize: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
      textAlign: 'center',
      textShadow: '2px 2px 4px black',
    };
    const uhmName = {
      width: '80vw',
      margin: 'auto',
      height: '150px',
      marginTop: '10px',
      marginBottom: '10px',
    };
    const imageStyle = {
      boxShadow: '5px 5px 10px 2px rgba(56, 125, 255, 0.17)',
    };
    return (
      <div id='landing-page'>
        <div style={uhmName}>
          <Image src={'images/uhm-name.png'} alt="uhm-name"/>
        </div>
        <Grid style={landingStyle} columns={2}>
          <Grid.Column style={textStyle}>
            <Image
              src='images/AlohaText.png'
              size='large'
            />
          </Grid.Column>
          <Grid.Column>
            <Header style={textStyle} inverted>Walking with Pele</Header>
            <Header style={textStyle2} inverted>Create Our own Stories</Header>
          </Grid.Column>
        </Grid>
        <Grid style={{ width: '90%', margin: 'auto', marginTop: '50px' }}>
          <Grid.Row>
            <Header style={textStyle} inverted>View Potential Spots</Header>
          </Grid.Row>
          <Grid.Row>
            <Header style={textStyle2} inverted>
              Find locations (Spots) for new experiences on Oahu!
            </Header>
          </Grid.Row>
          <Grid.Row centered>
            <Image style={imageStyle} src={'images/list-spots4.png'} size='huge'/>
            <Image style={imageStyle} src={'images/top-spots.png'} size='huge'/>
          </Grid.Row>
        </Grid>
        <Grid style={{ width: '90%', margin: 'auto', marginTop: '50px' }}>
          <Grid.Row>
            <Header style={textStyle} inverted>Contribute to the Collection</Header>
          </Grid.Row>
          <Grid.Row>
            <Header style={textStyle2} inverted>
              Share your own Spots for everyone to see!
            </Header>
          </Grid.Row>
          <Grid.Row centered>
            <Image style={imageStyle} src={'images/add-spot3.png'} size='huge'/>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Landing;
