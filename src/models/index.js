// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SpreadSheetRows, SpreadSheet, TemplateColumns, Templates, User } = initSchema(schema);

export {
  SpreadSheetRows,
  SpreadSheet,
  TemplateColumns,
  Templates,
  User
};