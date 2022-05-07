import React from 'react';
import { Feed } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Comment extends React.Component {
  render() {
    return (
      <Feed.Event id="spot-comment">
        <Feed.Content>
          <Feed.Summary>
            <Feed.User as={Link} to={`/user/${Meteor.user().username}`}>{Meteor.user().username}</Feed.User>
            <Feed.Date content={this.props.comment.createdAt.toLocaleDateString('en-US')} />
          </Feed.Summary>
          <Feed.Meta id="spot-comment-text">
            {this.props.comment.comment}
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

// Require a document to be passed to this component.
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Comment);
