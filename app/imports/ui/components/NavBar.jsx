import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Icon } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = {
      // marginBottom: '10px',
      backgroundColor: '#024731',
    };
    return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Image src='images/uhlogo2.png' alt="logo" size="small"/>
        </Menu.Item>
        {this.props.currentUser ? (
          [<Menu.Item className={'nav-button'} as={NavLink} activeClassName="active" exact to="/rand" key='rand'>
            <Icon name='map marker alternate'/>
          Spot of the Day
          </Menu.Item>,
          <Menu.Item className={'nav-button'} as={NavLink} activeClassName="active" exact to="/top-spots" key='top-spots'>
            <Icon name='heart outline'/>
          Top Spots
          </Menu.Item>,
          <Menu.Item className={'nav-button'} as={NavLink} activeClassName="active" exact to="/list" key='list'>
            <Icon name='map outline'/>
          All Spots
          </Menu.Item>,
          <Menu.Item className={'nav-button'} as={NavLink} activeClassName="active" exact to="/add" key='add'>
            <Icon name='add square'/>
          Add Spot
          </Menu.Item>,
          ]
        ) : ''}
        <Menu.Item key='social-media' position='right' fitted><Icon name='twitter'/></Menu.Item>
        <Menu.Item key='social-media' fitted><Icon name='facebook'/></Menu.Item>
        <Menu.Item key='social-media' fitted><Icon name='instagram'/></Menu.Item>
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}
        <Menu.Item>
          {this.props.currentUser === '' ? (
            <Dropdown className={'login-button'} id="login-dropdown" text="Login" pointing="top right" icon={'dropdown'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'dropdown'}>
              <Dropdown.Menu>
                <Dropdown.Item id="user-profile" icon="user" text="User Profile" as={NavLink} exact to="/user"/>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
