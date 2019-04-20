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
          <Button id='inputButton'>Period</Button>
          <Button id='inputButton'>PMS</Button>
          <FullCalendar
              defaultView = "dayGridMonth"
              plugins={[ dayGridPlugin, interactionPlugin ]}
              // ref={this.calendarRef}
              header = {{
                left: 'prev,next today',
                center: 'title',
              }}
              /*customButtons = {{
                inputPeriod: {
                  text: 'Period', click: function () {
                  }
                }
              }}*/
              events = {this.state.period}
              dateClick = { this.handleDateClick }
          />
        </Container>
    );
  }

  handleDateClick = (clicked) => {
    if (!this.state.period.find(period => period.start.toDateString() === clicked.date.toDateString())) {
      let first = clicked.date;
      let last;

      for (let i = 0; i < 2; i++) {
        first = new Date();
        first.setDate(clicked.date.getDate() + i * this.state.cycle);
        last = new Date(first.toDateString());
        last.setDate(first.getDate() + this.state.duration);
        console.log(first)
        console.log(last);
        this.setState({
          period: this.state.period.concat({
            title: 'period',
            start: first,
            end: last,
            allDay: true,
            backgroundColor: 'red'
          })
        });
        console.log(this.state.period);
      }
    } else {
      this.state.period.pop();
      this.state.period.pop();
      this.setState({ period: this.state.period });
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

