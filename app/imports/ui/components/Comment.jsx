import React from 'react';
import { Feed, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Comments } from '../../api/comment/Comments';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Comment extends React.Component {
  handleClick(id) {
    Comments.collection.remove({ _id: id });
  }

  deleteButton() {
    return (this.props.comment.owner === Meteor.user().username || Roles.userIsInRole(Meteor.userId(), 'admin')) ? <Button id='delete-comment-button'
      floated='right' icon='trash' size='tiny' onClick={() => this.handleClick(this.props.comment._id)}/> : null;
  }

  render() {
    return (
      <Feed.Event id="spot-comment">
        <Feed.Content>
          <Feed.Summary>
            <Feed.User as={Link} to={`/user/${this.props.comment.owner}`}>{this.props.comment.owner}</Feed.User>
            <Feed.Date content={this.props.comment.createdAt.toLocaleDateString('en-US')} />
            {this.deleteButton()}
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
