import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader } from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/profile';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import './style.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateClick = this.handleDateClick.bind(this);
    let period, cycle, pms, period_array, pms_array, fertility_array;

    if (this.props.profile == null) {
      cycle = 30;
      period = 5;
      pms = 7;
      period_array = [];
      pms_array = [];
      fertility_array = [];
    } else {
      cycle = this.props.profile.cycle;
      period = this.props.profile.period;
      pms = this.props.profile.pms;
      if (this.props.profile.period_array == null) {
        period_array = [];
        pms_array = [];
        fertility_array = [];
      } else {
        period_array = this.props.profile.period_array;
        pms_array = this.props.profile.pms_array;
        fertility_array = this.props.profile.fertility_array;
      }
    }

    this.state = {
      cycle: cycle,
      period: period,
      pms: pms,
      period_array: period_array,
      pms_array: pms_array,
      fertility_array: fertility_array,
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
          <h2>＊ Please click on the last date you had your period.<br/>
              ＊ Please reclick on the last date of period if you creat/edit your profile<br/><br/><br/></h2>
          <FullCalendar
              defaultView = "dayGridMonth"
              plugins = {[dayGridPlugin, interactionPlugin]}
              header = {{
                left: 'prev,next today',
                center: 'title',
              }}
              events = {this.state.fertility_array.concat(this.state.period_array.concat(this.state.pms_array))}
              dateClick = {this.handleDateClick}
          />
        </Container>
    );
  }

  handleDateClick = (clicked) => {
    this.state.period_array = [];
    this.state.pms_array = [];
    this.state.fertility_array = [];
    let first, last, pmsStart, pmsEnd, fertilityStart, fertilityEnd, today;

    for (let i = 0; i < 12; i++) {
      first = new Date();
      first.setDate(clicked.date.getDate() + i * this.state.cycle);
      last = new Date(first.toDateString());
      last.setDate(first.getDate() + this.state.period);

      pmsStart = new Date(first.toDateString());
      pmsStart.setDate(pmsStart.getDate() - this.state.pms);
      pmsEnd = new Date(first.toDateString());

      fertilityStart = new Date(first.toDateString());
      fertilityStart.setDate(first.getDate() - 14);
      fertilityEnd = new Date(fertilityStart.toDateString());
      fertilityEnd.setDate(fertilityStart.getDate() + 3);

      this.setState({
        fertility_array: this.state.fertility_array.concat({
          title: 'Fertility',
          start: fertilityStart,
          end: fertilityEnd,
          allDay: true,
          backgroundColor: '#33D8FF'
        }),
        period_array: this.state.period_array.concat({
          title: 'Period',
          start: first,
          end: last,
          allDay: true,
          backgroundColor: '#DB2828'
        }),
        pms_array: this.state.pms_array.concat({
          title: 'PMS',
          start: pmsStart,
          end: pmsEnd,
          allDay: true,
          backgroundColor: '#FBBD08'
        }),
      });

    }
    Profiles.update(this.props.profile._id, { $set: {period_array: this.state.period_array} });
    Profiles.update(this.props.profile._id, { $set: {pms_array: this.state.pms_array} });
    Profiles.update(this.props.profile._id, { $set: {fertility_array: this.state.fertility_array} });
  }
}

/** Require an array of Profile documents in the props. */
UserHome.propTypes = {
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
})(UserHome);
