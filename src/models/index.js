// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Templates, User } = initSchema(schema);

export {
  Templates,
  User
};