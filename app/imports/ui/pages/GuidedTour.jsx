import React from 'react';
import { Container, Tab } from 'semantic-ui-react';
import './style.css';

/** A simple static component to render some text for the landing page. */
class GuidedTour extends React.Component {
  render() {
    return (
        <Container>
          <Tab menu={{ pointing: true }} panes={
          [
            { menuItem: 'Step 1', render: () => <Tab.Pane attached={false}>Download the Yeelight app and set your bulb into LAN mode.</Tab.Pane> },
            { menuItem: 'Step 2', render: () => <Tab.Pane attached={false}>Input your menstruation data on the data input page.</Tab.Pane> },
            { menuItem: 'Step 3', render: () => <Tab.Pane attached={false}>The bulb will change color according to the current prediction. During your predicted PMS duration, the bulb will gradually increase in white color temperature. During your predicted bleeding duration, the bulb will gradually increase in orange color temperature. During the rest of the month, the bulb will remain the lightest white color. You can view your information in a calendar on the user data page. The app&#39;s purpose is to serve as an ambient reminder of your upcoming PMS and menstruation cycles.</Tab.Pane> },
          ]
        } />
        </Container>
    );
  }
}

export default GuidedTour;
