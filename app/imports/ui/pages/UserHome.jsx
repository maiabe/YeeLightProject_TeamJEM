import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Form } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/stuff';
import StuffItem from '/imports/ui/components/StuffItem';
import { withTracker } from 'meteor/react-meteor-data';
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './style.css'


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserHome extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      date: '',
      dates: [],
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
            <DatesRangeInput
                id='datesInput'
                inline
                name='date'
                value={this.state.date}
                onChange={this.handleChange}
                markColor={'red'}
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

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

}


/** Require an array of Stuff documents in the props. */
UserHome.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(UserHome);

