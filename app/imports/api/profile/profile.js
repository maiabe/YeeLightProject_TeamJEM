import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Profiles = new Mongo.Collection('Profiles');

/** Create a schema to constrain the structure of documents associated with this collection. */
const ProfileSchema = new SimpleSchema({
  name: String,
  birthday: Date,
  cycle: Number,
  period: Number,
  pms: Number,
  period_array: {
    type: Array,
    optional: true,
  },
  'period_array.$': Object,
  'period_array.$.title': String,
  'period_array.$.start': Date,
  'period_array.$.end': Date,
  'period_array.$.allDay': Boolean,
  'period_array.$.backgroundColor': String,
  pms_array: {
    type: Array,
    optional: true,
  },
  'pms_array.$': Object,
  'pms_array.$.title': String,
  'pms_array.$.start': Date,
  'pms_array.$.end': Date,
  'pms_array.$.allDay': Boolean,
  'pms_array.$.backgroundColor': String,
  fertility_array: {
    type: Array,
    optional: true,
  },
  'fertility_array.$': Object,
  'fertility_array.$.title': String,
  'fertility_array.$.start': Date,
  'fertility_array.$.end': Date,
  'fertility_array.$.allDay': Boolean,
  'fertility_array.$.backgroundColor': String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Profiles.attachSchema(ProfileSchema);

/** Make the collection and schema available to other code. */
export { Profiles, ProfileSchema };
