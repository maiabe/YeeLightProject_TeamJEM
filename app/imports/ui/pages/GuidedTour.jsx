import React from 'react';
import { Container, Grid, Message, Tab } from 'semantic-ui-react';
import './style.css';

/** A simple static component to render some text for the landing page. */
class GuidedTour extends React.Component {
  render() {
    return (
        <Container>
              <h1>Guided Tour</h1>
          </Grid>
          <Tab menu={{ pointing: true }} panes={
            [
              { menuItem: 'Step 1', render: () => <Tab.Pane attached={false}>Connect your Yeelight bulb.</Tab.Pane> },
              { menuItem: 'Step 2', render: () => <Tab.Pane attached={false}>Input your menstruation data on the data input page.</Tab.Pane> },
              { menuItem: 'Step 3', render: () => <Tab.Pane attached={false}>The bulb will change color according to the current prediction. During your predicted PMS duration, the bulb will gradually increase in white color temperature. During your predicted bleeding duration, the bulb will gradually increase in orange color temperature.</Tab.Pane> },
            ]
          } />
                  <a href="https://www.yeelight.com/home"> Yeelight Home Page </a>
              </p>
                Below are the steps of how to use WWAT.
              </p>
              <Tab menu={{ pointing: true }} panes={
                [
                  { menuItem: 'Step 1', render: () => <Tab.Pane attached={false}>
                      <p>[ Connect your Yeelight bulb ]</p>
                      <p>＊ Follow the instructions on the Yeelight app to connect the bulb to your phone</p>
                      <p>＊ Turn on the LAN control mode to use WWAT</p>
                    </Tab.Pane> },
                  { menuItem: 'Step 2', render: () => <Tab.Pane attached={false}>
                      <p> [ Input your menstruation data ] </p>
                      <p> ＊ Login to your account or Sign up if you don't have an account with us yet </p>
                      <p> ＊ Click on the 'Profile' tab on the menu bar, and create your profile </p>
                      <p> ＊ Edit your personalized data any time on Profile page </p>
                  </Tab.Pane> },
                  { menuItem: 'Step 3', render: () => <Tab.Pane attached={false}>
                      <p> [ See Predictions on User Home Page ] </p>
                      <p> ＊ Click on the 'Home' tab on the menu bar to see your menstruation prediction calendar </p>
                      <p> ＊ On the calendar, click on the date you last had your period. <br/>
                        (If no data is provided for the Profile, default average prediction dates are going to show on the calendar.) </p>
                      <p> ＊ When the current date falls on the predicted dates, the bulb will change to the following colors accordingly: <br/></p>
                          <p>
                              <li id='bulletpoint1'> PMS = White </li>
                              <li id='bulletpoint2'> Period = Orange </li>
                              <li id='bulletpoint3'> Fertility = ... </li>
                          </p>
                  </Tab.Pane> },
                ]
              } />
        </Container>
    );
  }
}

export default GuidedTour;
