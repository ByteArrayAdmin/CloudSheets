// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { AppConstants, CustomerSupport, SpreadSheetRows, SpreadSheet, TemplateColumns, Templates, User } = initSchema(schema);

export {
  AppConstants,
  CustomerSupport,
  SpreadSheetRows,
  SpreadSheet,
  TemplateColumns,
  Templates,
  User
};