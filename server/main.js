import { Meteor } from 'meteor/meteor';
import Server from '../imports/api/server/Server';
import '../imports/api/server/publicationss/registry';

Meteor.startup(async () => {
  Server.run();
});
