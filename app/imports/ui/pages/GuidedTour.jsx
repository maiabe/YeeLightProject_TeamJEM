import React from 'react';
import { Container, Grid, Tab } from 'semantic-ui-react';
import './style.css';

/** A simple static component to render some text for the landing page. */
class GuidedTour extends React.Component {
  render() {
    return (
        <Container>
          <Grid textAlign='left' container>
            <Grid.Column id='title' width={8}>
              <h1>Guided Tour</h1>
            </Grid.Column>
          </Grid>
          <Tab menu={{ pointing: true }} panes={
          [
            [
        </Container>
    );
  }
}

export default GuidedTour;
