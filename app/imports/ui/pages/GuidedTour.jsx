import React from 'react';
import { Container, Tab } from 'semantic-ui-react';
import './style.css';

/** A simple static component to render some text for the landing page. */
class GuidedTour extends React.Component {
  render() {
    return (
<<<<<<< HEAD
        <Grid textAlign='left' container>
          <Grid.Column id='title' width={8}>
            <h1>Guided Tour</h1>
          </Grid.Column>
        </Grid>
=======
        <Container>
          <Tab menu={{ pointing: true }} panes={
          [
            { menuItem: 'Step 1', render: () => <Tab.Pane attached={false}>Connect your Yeelight bulb.</Tab.Pane> },
            { menuItem: 'Step 2', render: () => <Tab.Pane attached={false}>Input your menstruation data on the data input page.</Tab.Pane> },
            { menuItem: 'Step 3', render: () => <Tab.Pane attached={false}>The bulb will change color according to the current prediction. During your predicted PMS duration, the bulb will gradually increase in white color temperature. During your predicted bleeding duration, the bulb will gradually increase in orange color temperature.</Tab.Pane> },
          ]
        } />
        </Container>
>>>>>>> about-page
    );
  }
}

export default GuidedTour;
