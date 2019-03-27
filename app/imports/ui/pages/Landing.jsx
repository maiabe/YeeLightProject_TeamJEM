import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import './style.css';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid verticalAlign='left' textAlign='left' container>
          <Grid.Column id='title' width={8}>
            <h1>Women's</h1>
            <h1>Wellness</h1>
            <h1>Assurance</h1>
            <h1>Tracker</h1>
          </Grid.Column>
          <Grid.Column id='guided_tour' width={8}>
            <p>WWAT is a period tracker to help assure healthy lifestyle for women.</p>
            <p>Sign up to get started and be free of stress today !</p>
            <Button size='big' color='red'>Guided Tour</Button>
          </Grid.Column>
        </Grid>
    );
  }
}

export default Landing;
