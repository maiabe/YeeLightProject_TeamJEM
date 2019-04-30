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
import PropTypes from 'prop-types';
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
    this.formRef = false;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
      this.setState({ error: '', formRef: true });
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, birthday, cycle, period, pms } = data;
    const owner = Meteor.user().username;
    Profiles.insert( { name, birthday, cycle, period, pms, owner }, this.insertCallback);
    // Profiles.update(_id, { $set: { name, birthday, cycle, period, pms } }, (error) => (error ?
    //     Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
    //     Bert.alert({ type: 'success', message: 'Update succeeded' })));
    // this.browserHistory.push('/profile');
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
                <TextField name="name" label="Name"></TextField>
                <TextField type="date" name="birthday" label="Birthday"></TextField>
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

/** Require the presence of a Profile document in the props object. Uniforms adds 'model' to the props, which we use. */
InputData.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// /** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
// export default withTracker(({ match }) => {
//   // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
//   const documentId = match.params._id;
//   // Get access to Stuff documents.
//   const subscription = Meteor.subscribe('Profile');
//   return {
//     doc: Profiles.findOne(documentId),
//     ready: subscription.ready(),
//   };
// })(InputData);

export default InputData;
