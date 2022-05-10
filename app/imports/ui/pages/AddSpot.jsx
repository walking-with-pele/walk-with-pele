import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField, LongTextField, NumField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Spots } from '../../api/spot/Spots';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  address: String,
  spotType: {
    type: String,
    allowedValues: ['beach', 'hike', 'library', 'park'],
    defaultValue: 'beach',
  },
  picture: {
    type: String,
    optional: true,
  },
  description: String,
  coordinatesX: Number,
  coordinatesY: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a Spot document. */
class AddSpot extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, address, spotType, picture, description, coordinatesX, coordinatesY } = data;
    const owner = Meteor.user().username;
    Spots.collection.insert({ name, address, spotType, picture, description, coordinatesX, coordinatesY, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Spot added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid id="add-spot-page" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Spot</Header>
          <AutoForm id='add-spot-form' ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField id='add-form-name' name='name'/>
              <TextField id='add-form-address' name='address'/>
              <SelectField name='spotType'/>
              <TextField id='add-form-picture' label='Picture (optional)' name='picture'/>
              <LongTextField id='add-form-description' name='description'/>
              <NumField id='add-form-x' label='x-coordinate' name='coordinatesX'/>
              <NumField id='add-form-y' label='y-coordinate' name='coordinatesY'/>
              <SubmitField id='add-form-submit' value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddSpot;
