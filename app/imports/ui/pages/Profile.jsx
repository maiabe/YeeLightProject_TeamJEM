import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Segment, Button, Icon } from 'semantic-ui-react';
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
              Name: {this.props.profile.name}<hr/>
              <Icon name="birthday cake"/>Birthday: {this.props.profile.birthday.toUTCString().substr(0, 16)}<hr/>
              Average cycle duration: {this.props.profile.cycle} days<hr/>
              Average period duration: {this.props.profile.period} days<hr/>
              Average PMS duration: {this.props.profile.pms} days<hr/>
            </Segment>
            <Button id='editbutton' as={Link} to={`/edit/${this.props.profile._id}`}>Edit</Button>
          </Container>
      );
    } else {
      return (
          <Container>
            <Link to={`/input`}>
            <Button id='button'>Create Profile</Button>
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
