import React from 'react';
import { Grid, Container, Icon, Input } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
      <footer id="footer">
        <Container>
          <hr />
          <Grid columns="equal">
            <Grid.Column>
              <div style={divStyle} className="ui center aligned container">
              Contact us if there is any concerns!<br />
              Feel free to contact us if there is unnecessary spots or activities is posted!<br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
                <a href="https://walking-with-pele.xyz/">
                  Homepage
                </a><br />
              </div>
            </Grid.Column>
            <Grid.Column>
              <div style={divStyle} className="ui center aligned container">
                <p>Join our `ohana and Enjoy the relaxing Spots and Actitivies!</p>
                <Input icon="mail outline" placeholder="Email address" />
                <div style={divStyle}>
                  <a href="https://www.facebook.com/">
                    <Icon name="facebook f" size="big"/>
                  </a>
                  <a href="https://www.instagram.com/">
                    <Icon name="instagram" size="big" />
                  </a>
                </div>
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      </footer>
    );
  }
}

export default Footer;
