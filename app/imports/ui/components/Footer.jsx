import React from 'react';
import { List, Container, Icon, Input } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '5px', paddingBottom: '15px' };
    return (
      <Container textAlign='center' id="footer">
        <hr />
        <List style={divStyle}>
          <List.Item>Feel free to contact us if there are unnecessary spots or activities is posted!</List.Item>
          <List.Item>Join our ohana and enjoy the relaxing comments and activities!</List.Item>
          <List.Item><Input icon="mail outline" placeholder="Email address" /></List.Item>
          <List.Item style={divStyle}>
            <a href="https://www.facebook.com/">
              <Icon name="facebook f" size="large"/>
            </a>
            <a href="https://www.instagram.com/">
              <Icon name="instagram" size="large" />
            </a>
          </List.Item>
          <List.Item>
            <a href="https://walking-with-pele.xyz/">
                  Homepage
            </a>
          </List.Item>
        </List>
      </Container>
    );
  }
}

export default Footer;
