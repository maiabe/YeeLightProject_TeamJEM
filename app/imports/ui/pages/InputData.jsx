import React from 'react';
import { Profiles, ProfileSchema } from '/imports/api/profile/profile';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';

/** Renders the Page for adding a document. */
class InputData extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.state = { error: '', formRef: false };
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      // this.formRef.reset();
      this.setState({ error: '', formRef: true });
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, birthday, cycle, period, pms } = data;
    const owner = Meteor.user().username;
    const period_array = [];
    const pms_array = [];
    const fertility_array = [];
    Profiles.insert( { name, birthday, cycle, period, pms, period_array, pms_array, fertility_array, owner },
        this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/profile' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.formRef) {
      return <Redirect to={from}/>;
    }
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Input Data</Header>
            <AutoForm ref={(ref) => {this.formRef = ref;}} schema={ProfileSchema} onSubmit={this.submit}>
              <Segment>
                <TextField name="name" label="Name"/>
                <TextField type="date" name="birthday" label="Birthday"/>
                <NumField name='cycle' label='Average cycle duration (days)' decimal={false}/>
                <NumField name='period' label='Average period duration (days)' decimal={false}/>
                <NumField name='pms' label='Average PMS duration (days)' decimal={false}/>
                <SubmitField id='editbutton' value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value='fakeuser@foo.com'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default InputData;
