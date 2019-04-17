import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Segment, Button } from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/profile';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a table containing all of the Profile documents. */
class Profile extends React.Component {

  /** Render the page once subscriptions have been received. */
  render() {
    if (this.props.profile != null) {
      return (
          <Container>
            <Header as="h2" textAlign="center">Your Profile</Header>
            <Segment>
              Birthday: {this.props.profile.birthday.toString()}<br/><br/>
              Last period: {this.props.profile.last_period.toString()}<br/><br/>
              Average cycle duration: {this.props.profile.cycle} days<br/><br/>
              Average period duration: {this.props.profile.duration} days<br/>
            </Segment>
            <Link to={`/edit/${this.props.profile._id}`}>Edit</Link>
          </Container>
      );
    } else {
      return (
          <Container>
            <Link to={`/input`}>
            <Button id='profileButton' color='red'>Create Profile</Button>
            </Link>
          </Container>
      );
    }
  }
}
Profile.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Profile documents.
  const subscription = Meteor.subscribe('Profile');
  return {
    profile: Profiles.findOne({}),
    ready: subscription.ready(),
  };
})(Profile);
