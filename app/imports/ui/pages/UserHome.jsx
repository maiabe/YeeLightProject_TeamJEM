import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Form, Icon } from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/profile';
import { withTracker } from 'meteor/react-meteor-data';
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput,
} from 'semantic-ui-calendar-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './style.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserHome extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      date: '',
      dates: []
    };
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container id='container'>
          <Header id="calendarTitle" as="h1" textAlign="center">See Predictions</Header>
          <Form>
            {/*<DateInput*/}
                {/*name="date"*/}
                {/*dateFormat={'YYYY-MM-DD'}*/}
                {/*inline*/}
                {/*placeholder="Period Date"*/}
                {/*value={this.state.date}*/}
                {/*marked={this.state.dates}*/}
                {/*markColor={'red'}*/}
                {/*// icon={<Icon link name='add' />}*/}
                {/*// iconPosition="left"*/}
                {/*onChange={this.handleChange}*/}
                {/*// clearable*/}
                {/*// clearIcon={<Icon link name='remove'/>}*/}
                {/*// onClear={this.clearDays}*/}
            {/*/>*/}
            <FullCalendar
                defaultView="dayGridMonth"
                plugins={[ dayGridPlugin ]}
            />
          </Form>
        </Container>
    );
  }

  // marked = (event, {name, value}) => {
  //   // if (this.state.hasOwnProperty(name)) {
  //     this.state.dates.push(value);
  //     console.log('date pushed');
  //   // }
  // };

  clearDays = () => {
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
  };

  handleChange = (event, {name, value}) => {
    this.state.dates = [];
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
      this.addDays(value);
    }

    var today = moment().format().split('T')[0];
    if (this.state.dates.find(date => date.format().split('T')[0] === today)) {
      console.log('Change bulb to orange'); // light.setCtAbx(1700, "smooth", 5000);
    }
  };
}


/** Require an array of Stuff documents in the props. */
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

