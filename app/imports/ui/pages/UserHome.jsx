import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Button } from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/profile';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import './style.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserHome extends React.Component {

  constructor(props) {
    super(props);
    this.calendarComponentRef = React.createRef();
    // this.handleDateClick() = this.handleDateClick().bind(this);
    this.state = {
      period: [],
      pms: []
    };
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Button id='button'>Period</Button>
          <Button id='button'>PMS</Button>
          <FullCalendar
              defaultView = "dayGridMonth"
              header = {{
                left: 'prev,next today',
                center: 'title',
              }}
              plugins={[ dayGridPlugin, interactionPlugin ]}
              /*customButtons = {{
                inputPeriod: {
                  text: 'Period', click: function () {
                  }
                }
              }}*/
              dateClick = { this.handleDateClick }
          />
        </Container>
    );
  }

  // marked = (event, {name, value}) => {
  //   // if (this.state.hasOwnProperty(name)) {
  //     this.state.dates.push(value);
  //     console.log('date pushed');
  //   // }
  // };

  /*clearDays = () => {
    return this.state.days = [];
  };

  addDays = value => {
    var i;
    var duration = (this.props.profile == null) ? 7 : this.props.profile.duration; // default duration = 7;
    for (i = 0; i < duration; i++) {
      // this.state.dates.push(value);
      this.state.dates.push(moment(value)); // all dates in array are Moment objects
      // value = value.getDate() + 1;
      value = moment(value, "YYYY-MM-DD").add(1,'days');
    }
  };*/

  handleDateClick = (arg) => {
    // do something
  }
}


/** Require an array of Profile documents in the props. */
UserHome.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Profile');
  return {
    profile: Profiles.findOne({}),
    ready: subscription.ready(),
  };
})(UserHome);

