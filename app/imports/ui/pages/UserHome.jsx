import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Button, Form } from 'semantic-ui-react';
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
    this.calendarRef = React.createRef();
    this.handleDateClick = this.handleDateClick.bind(this);
    const duration = (this.props.profile == null) ? 5 : this.props.profile.duration;
    this.state = {
      duration: duration,
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
              ref={this.calendarRef}
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
    this.state.period = [];
    const found = this.state.period.find(period => period.start == clicked.date);
    console.log(found);
    if (!found) {
      let last = new Date(clicked.date.toDateString());
      last.setDate(last.getDate() + this.state.duration);
      this.setState({
        period: this.state.period.concat({
          title: 'period',
          start: clicked.date,
          end: last,
          allDay: clicked.allDay,
          backgroundColor: 'red'
        })
      })
    } else {
      found.remove();
    }

    //this.state.period.push({title: 'period', start: clicked.date, end: last });
    // console.log(this.state.period);
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

