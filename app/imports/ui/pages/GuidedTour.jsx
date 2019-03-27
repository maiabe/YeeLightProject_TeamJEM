import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import './style.css';

/** A simple static component to render some text for the landing page. */
class GuidedTour extends React.Component {
  render() {
    return (
        <Grid verticalAlign='left' textAlign='left' container>
          <Grid.Column id='title' width={8}>
            <h1>Guided Tour</h1>
          </Grid.Column>
        </Grid>
    );
  }
}

export default GuidedTour;
