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
    let first, last, pmsStart, pmsEnd, fertilityStart, fertilityEnd, date;

    for (let i = 0; i < 12; i++) {
      first = new Date(clicked.date.toDateString());
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


    date = new Date();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    const currMon = monthNames[date.getMonth()].toString();
    const currDay = parseInt(date.getDate().toString(), 10);
    const currYear = date.getFullYear().toString();

    const currPrediction = Profiles.findOne({ owner: Meteor.user().username });
    let normal = true;

    if (typeof currPrediction !== 'undefined') {
      for (let i = 0; i < 12; i++) {
        if (currPrediction.period_array[i].start.toDateString().substr(11, 4).toString() === currYear) {
          if (currPrediction.period_array[i].start.toDateString().substr(4, 3).toString() === currMon) {
            const tempStart = currPrediction.period_array[i].start.toDateString().substr(8, 2).toString();
            const tempEnd = currPrediction.period_array[i].end.toDateString().substr(8, 2).toString();
            const startDay = parseInt(tempStart, 10);
            const endDay = parseInt(tempEnd, 10);

            // Change the bulb color for period
            for (let j = startDay; j <= endDay; j++) {            // j = duration for period predictions
              if (j === currDay) {
                Meteor.call('periodNotify', {}, (err) => {
                  if (err) {
                    alert(err);
                  }
                });
                console.log("Period");
                normal = false;
              }
            }

            // Change the bulb color for pms
            const pmsStartDay = startDay - this.state.pms;
            const pmsEndDay = startDay - 1;
            for (let j = pmsStartDay; j <= pmsEndDay; j++) {            // j = duration for pms predictions
              if (j === currDay) {
                Meteor.call('pmsNotify', {}, (err) => {
                  if (err) {
                    alert(err);
                  }
                });
                console.log("PMS");
                normal = false;
              }
            }

            // Change the bulb color for fertility
            const fertStartDay = startDay - 14;
            const fertEndDay = fertStartDay + 2;
            for (let j = fertStartDay; j <= fertEndDay; j++) {            // j = duration for fertility predictions
              if (j === currDay) {
                Meteor.call('fertilityNotify', {}, (err) => {
                  if (err) {
                    alert(err);
                  }
                });
                console.log("Fertility");
                normal = false;
              }
            }
          }
        }

      }
      if (normal) {
        Meteor.call('normalCT', {}, (err) => {
          if (err) {
            alert(err);
          }
        });
        console.log("Normal");
      }

    }
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
