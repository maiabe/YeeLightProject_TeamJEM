import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Label, Grid } from 'semantic-ui-react';
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
  calendarRef = React.createRef();
  constructor(props) {
    super(props);
    // this.calendarRef = React.createRef();
    this.handleDateClick = this.handleDateClick.bind(this);
    const duration = (this.props.profile == null) ? 5 : this.props.profile.duration;
    const cycle = (this.props.profile == null) ? 28 : this.props.profile.cycle;
    this.state = {
      duration: duration,
      cycle: cycle,
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
          <FullCalendar
              defaultView = "dayGridMonth"
              plugins={[ dayGridPlugin, interactionPlugin ]}
              // ref={this.calendarRef}
              header = {{
                left: 'prev,next today',
                center: 'title',
              }}
              events = {this.state.period.concat(this.state.pms)}
              dateClick = { this.handleDateClick }
          />
        </Container>
    );
  }

  handleDateClick = (clicked) => {
    this.state.period = [];
    this.state.pms = [];
    let first, last, pmsStart, pmsEnd;

    for (let i = 0; i < 12; i++) {
      first = new Date();
      first.setDate(clicked.date.getDate() + i * this.state.cycle);
      last = new Date(first.toDateString());
      last.setDate(first.getDate() + this.state.duration);

      pmsStart = new Date(first.toDateString());
      pmsStart.setDate(pmsStart.getDate() - 5);
      pmsEnd = new Date(first.toDateString());

      this.setState({
        period: this.state.period.concat({
          title: 'Period',
          start: first,
          end: last,
          allDay: true,
          backgroundColor: '#DB2828'
        }),
        pms: this.state.pms.concat({
          title: 'PMS',
          start: pmsStart,
          end: pmsEnd,
          allDay: true,
          backgroundColor: '#FBBD08'
        })
      });
    }
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
