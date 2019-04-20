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
    const duration = (this.props.profile == null) ? 5 : this.props.profile.period;
    const cycle = (this.props.profile == null) ? 28 : this.props.profile.cycle;
    const pms_duration = (this.props.profile == null) ? 7 : this.props.profile.pms;
    this.state = {
      duration: duration,
      cycle: cycle,
      pms_duration: pms_duration,
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
          <Card>
            <Card.Content>
              <Card.Header id='header'>Legend</Card.Header>
              <Container>
                <Label.Group size='mini'>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column>
                        <Label circular color='red' horizontal></Label> Period
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column>
                        <Label circular color='yellow' horizontal></Label> PMS
                      </Grid.Column>
                    </Grid.Row>

                  </Grid>
                </Label.Group>
              </Container>
            </Card.Content>
          </Card>

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
      pmsStart.setDate(pmsStart.getDate() - this.state.pms_duration);
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

      console.log(this.state.pms);

      /*const today = new Date();
      const periodNow = this.state.period.find(period => today.getTime() > period.start.getTime() &&
          today.getTime() < period.end.getTime());
      if (periodNow) {
        console.log("Currently on period - turn bulb orange.");
      }*/
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
