import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileComp extends React.Component {
  render() {
    return (
        <Container>
          <Segment>
            Birthday: {this.props.profile.birthday.toString()}<br/><br/>
            Last period: {this.props.profile.last_period.toString()}<br/><br/>
            Average cycle duration: {this.props.profile.cycle} days<br/><br/>
            Average period duration: {this.props.profile.duration} days<br/>
          </Segment>
          <Link to={`/edit/${this.props.profile._id}`}>Edit</Link>
        </Container>
    );
  }
}

/** Require a document to be passed to this component. */
ProfileComp.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ProfileComp);
