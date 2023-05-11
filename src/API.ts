/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSpreadSheetRowsInput = {
  id?: string | null,
  items?: string | null,
  userID: string,
  templatesID: string,
  spreadsheetID: string,
  _version?: number | null,
};

export type ModelSpreadSheetRowsConditionInput = {
  items?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  templatesID?: ModelIDInput | null,
  spreadsheetID?: ModelIDInput | null,
  and?: Array< ModelSpreadSheetRowsConditionInput | null > | null,
  or?: Array< ModelSpreadSheetRowsConditionInput | null > | null,
  not?: ModelSpreadSheetRowsConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type SpreadSheetRows = {
  __typename: "SpreadSheetRows",
  id: string,
  items?: string | null,
  userID: string,
  templatesID: string,
  spreadsheetID: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateSpreadSheetRowsInput = {
  id: string,
  items?: string | null,
  userID?: string | null,
  templatesID?: string | null,
  spreadsheetID?: string | null,
  _version?: number | null,
};

export type DeleteSpreadSheetRowsInput = {
  id: string,
  _version?: number | null,
};

export type CreateSpreadSheetInput = {
  id?: string | null,
  spreadsheet_name?: string | null,
  templatesID: string,
  userID: string,
  _version?: number | null,
};

export type ModelSpreadSheetConditionInput = {
  spreadsheet_name?: ModelStringInput | null,
  templatesID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelSpreadSheetConditionInput | null > | null,
  or?: Array< ModelSpreadSheetConditionInput | null > | null,
  not?: ModelSpreadSheetConditionInput | null,
};

export type SpreadSheet = {
  __typename: "SpreadSheet",
  id: string,
  spreadsheet_name?: string | null,
  templatesID: string,
  userID: string,
  SpreadSheetRows?: ModelSpreadSheetRowsConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelSpreadSheetRowsConnection = {
  __typename: "ModelSpreadSheetRowsConnection",
  items:  Array<SpreadSheetRows | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UpdateSpreadSheetInput = {
  id: string,
  spreadsheet_name?: string | null,
  templatesID?: string | null,
  userID?: string | null,
  _version?: number | null,
};

export type DeleteSpreadSheetInput = {
  id: string,
  _version?: number | null,
};

export type CreateTemplateColumnsInput = {
  id?: string | null,
  column_Name?: string | null,
  column_Type?: string | null,
  templatesID: string,
  _version?: number | null,
};

export type ModelTemplateColumnsConditionInput = {
  column_Name?: ModelStringInput | null,
  column_Type?: ModelStringInput | null,
  templatesID?: ModelIDInput | null,
  and?: Array< ModelTemplateColumnsConditionInput | null > | null,
  or?: Array< ModelTemplateColumnsConditionInput | null > | null,
  not?: ModelTemplateColumnsConditionInput | null,
};

export type TemplateColumns = {
  __typename: "TemplateColumns",
  id: string,
  column_Name?: string | null,
  column_Type?: string | null,
  templatesID: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateTemplateColumnsInput = {
  id: string,
  column_Name?: string | null,
  column_Type?: string | null,
  templatesID?: string | null,
  _version?: number | null,
};

export type DeleteTemplateColumnsInput = {
  id: string,
  _version?: number | null,
};

export type CreateTemplatesInput = {
  id?: string | null,
  template_name?: string | null,
  userID: string,
  _version?: number | null,
};

export type ModelTemplatesConditionInput = {
  template_name?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelTemplatesConditionInput | null > | null,
  or?: Array< ModelTemplatesConditionInput | null > | null,
  not?: ModelTemplatesConditionInput | null,
};

export type Templates = {
  __typename: "Templates",
  id: string,
  template_name?: string | null,
  userID: string,
  TemplateColumns?: ModelTemplateColumnsConnection | null,
  SpreadSheets?: ModelSpreadSheetConnection | null,
  SpreadSheetRows?: ModelSpreadSheetRowsConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelTemplateColumnsConnection = {
  __typename: "ModelTemplateColumnsConnection",
  items:  Array<TemplateColumns | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSpreadSheetConnection = {
  __typename: "ModelSpreadSheetConnection",
  items:  Array<SpreadSheet | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UpdateTemplatesInput = {
  id: string,
  template_name?: string | null,
  userID?: string | null,
  _version?: number | null,
};

export type DeleteTemplatesInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserInput = {
  id?: string | null,
  name?: string | null,
  email?: string | null,
  _version?: number | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  name?: string | null,
  email?: string | null,
  Templates?: ModelTemplatesConnection | null,
  SpreadSheets?: ModelSpreadSheetConnection | null,
  SpreadSheetRows?: ModelSpreadSheetRowsConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelTemplatesConnection = {
  __typename: "ModelTemplatesConnection",
  items:  Array<Templates | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  _version?: number | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type CreateSpreadSheetRowsMutationVariables = {
  input: CreateSpreadSheetRowsInput,
  condition?: ModelSpreadSheetRowsConditionInput | null,
};

export type CreateSpreadSheetRowsMutation = {
  createSpreadSheetRows?:  {
    __typename: "SpreadSheetRows",
    id: string,
    items?: string | null,
    userID: string,
    templatesID: string,
    spreadsheetID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateSpreadSheetRowsMutationVariables = {
  input: UpdateSpreadSheetRowsInput,
  condition?: ModelSpreadSheetRowsConditionInput | null,
};

export type UpdateSpreadSheetRowsMutation = {
  updateSpreadSheetRows?:  {
    __typename: "SpreadSheetRows",
    id: string,
    items?: string | null,
    userID: string,
    templatesID: string,
    spreadsheetID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteSpreadSheetRowsMutationVariables = {
  input: DeleteSpreadSheetRowsInput,
  condition?: ModelSpreadSheetRowsConditionInput | null,
};

export type DeleteSpreadSheetRowsMutation = {
  deleteSpreadSheetRows?:  {
    __typename: "SpreadSheetRows",
    id: string,
    items?: string | null,
    userID: string,
    templatesID: string,
    spreadsheetID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateSpreadSheetMutationVariables = {
  input: CreateSpreadSheetInput,
  condition?: ModelSpreadSheetConditionInput | null,
};

export type CreateSpreadSheetMutation = {
  createSpreadSheet?:  {
    __typename: "SpreadSheet",
    id: string,
    spreadsheet_name?: string | null,
    templatesID: string,
    userID: string,
    SpreadSheetRows?:  {
      __typename: "ModelSpreadSheetRowsConnection",
      items:  Array< {
        __typename: "SpreadSheetRows",
        id: string,
        items?: string | null,
        userID: string,
        templatesID: string,
        spreadsheetID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateSpreadSheetMutationVariables = {
  input: UpdateSpreadSheetInput,
  condition?: ModelSpreadSheetConditionInput | null,
};

export type UpdateSpreadSheetMutation = {
  updateSpreadSheet?:  {
    __typename: "SpreadSheet",
    id: string,
    spreadsheet_name?: string | null,
    templatesID: string,
    userID: string,
    SpreadSheetRows?:  {
      __typename: "ModelSpreadSheetRowsConnection",
      items:  Array< {
        __typename: "SpreadSheetRows",
        id: string,
        items?: string | null,
        userID: string,
        templatesID: string,
        spreadsheetID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteSpreadSheetMutationVariables = {
  input: DeleteSpreadSheetInput,
  condition?: ModelSpreadSheetConditionInput | null,
};

export type DeleteSpreadSheetMutation = {
  deleteSpreadSheet?:  {
    __typename: "SpreadSheet",
    id: string,
    spreadsheet_name?: string | null,
    templatesID: string,
    userID: string,
    SpreadSheetRows?:  {
      __typename: "ModelSpreadSheetRowsConnection",
      items:  Array< {
        __typename: "SpreadSheetRows",
        id: string,
        items?: string | null,
        userID: string,
        templatesID: string,
        spreadsheetID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateTemplateColumnsMutationVariables = {
  input: CreateTemplateColumnsInput,
  condition?: ModelTemplateColumnsConditionInput | null,
};

export type CreateTemplateColumnsMutation = {
  createTemplateColumns?:  {
    __typename: "TemplateColumns",
    id: string,
    column_Name?: string | null,
    column_Type?: string | null,
    templatesID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateTemplateColumnsMutationVariables = {
  input: UpdateTemplateColumnsInput,
  condition?: ModelTemplateColumnsConditionInput | null,
};

export type UpdateTemplateColumnsMutation = {
  updateTemplateColumns?:  {
    __typename: "TemplateColumns",
    id: string,
    column_Name?: string | null,
    column_Type?: string | null,
    templatesID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteTemplateColumnsMutationVariables = {
  input: DeleteTemplateColumnsInput,
  condition?: ModelTemplateColumnsConditionInput | null,
};

export type DeleteTemplateColumnsMutation = {
  deleteTemplateColumns?:  {
    __typename: "TemplateColumns",
    id: string,
    column_Name?: string | null,
    column_Type?: string | null,
    templatesID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateTemplatesMutationVariables = {
  input: CreateTemplatesInput,
  condition?: ModelTemplatesConditionInput | null,
};

export type CreateTemplatesMutation = {
  createTemplates?:  {
    __typename: "Templates",
    id: string,
    template_name?: string | null,
    userID: string,
    TemplateColumns?:  {
      __typename: "ModelTemplateColumnsConnection",
      items:  Array< {
        __typename: "TemplateColumns",
        id: string,
        column_Name?: string | null,
        column_Type?: string | null,
        templatesID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SpreadSheets?:  {
      __typename: "ModelSpreadSheetConnection",
      items:  Array< {
        __typename: "SpreadSheet",
        id: string,
        spreadsheet_name?: string | null,
        templatesID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SpreadSheetRows?:  {
      __typename: "ModelSpreadSheetRowsConnection",
      items:  Array< {
        __typename: "SpreadSheetRows",
        id: string,
        items?: string | null,
        userID: string,
        templatesID: string,
        spreadsheetID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateTemplatesMutationVariables = {
  input: UpdateTemplatesInput,
  condition?: ModelTemplatesConditionInput | null,
};

export type UpdateTemplatesMutation = {
  updateTemplates?:  {
    __typename: "Templates",
    id: string,
    template_name?: string | null,
    userID: string,
    TemplateColumns?:  {
      __typename: "ModelTemplateColumnsConnection",
      items:  Array< {
        __typename: "TemplateColumns",
        id: string,
        column_Name?: string | null,
        column_Type?: string | null,
        templatesID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SpreadSheets?:  {
      __typename: "ModelSpreadSheetConnection",
      items:  Array< {
        __typename: "SpreadSheet",
        id: string,
        spreadsheet_name?: string | null,
        templatesID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SpreadSheetRows?:  {
      __typename: "ModelSpreadSheetRowsConnection",
      items:  Array< {
        __typename: "SpreadSheetRows",
        id: string,
        items?: string | null,
        userID: string,
        templatesID: string,
        spreadsheetID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteTemplatesMutationVariables = {
  input: DeleteTemplatesInput,
  condition?: ModelTemplatesConditionInput | null,
};

export type DeleteTemplatesMutation = {
  deleteTemplates?:  {
    __typename: "Templates",
    id: string,
    template_name?: string | null,
    userID: string,
    TemplateColumns?:  {
      __typename: "ModelTemplateColumnsConnection",
      items:  Array< {
        __typename: "TemplateColumns",
        id: string,
        column_Name?: string | null,
        column_Type?: string | null,
        templatesID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SpreadSheets?:  {
      __typename: "ModelSpreadSheetConnection",
      items:  Array< {
        __typename: "SpreadSheet",
        id: string,
        spreadsheet_name?: string | null,
        templatesID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SpreadSheetRows?:  {
      __typename: "ModelSpreadSheetRowsConnection",
      items:  Array< {
        __typename: "SpreadSheetRows",
        id: string,
        items?: string | null,
        userID: string,
        templatesID: string,
        spreadsheetID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email?: string | null,
    Templates?:  {
      __typename: "ModelTemplatesConnection",
      items:  Array< {
        __typename: "Templates",
        id: string,
        template_name?: string | null,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SpreadSheets?:  {
      __typename: "ModelSpreadSheetConnection",
      items:  Array< {
        __typename: "SpreadSheet",
        id: string,
        spreadsheet_name?: string | null,
        templatesID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SpreadSheetRows?:  {
      __typename: "ModelSpreadSheetRowsConnection",
      items:  Array< {
        __typename: "SpreadSheetRows",
        id: string,
        items?: string | null,
        userID: string,
        templatesID: string,
        spreadsheetID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email?: string | null,
    Templates?:  {
      __typename: "ModelTemplatesConnection",
      items:  Array< {
        __typename: "Templates",
        id: string,
        template_name?: string | null,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SpreadSheets?:  {
      __typename: "ModelSpreadSheetConnection",
      items:  Array< {
        __typename: "SpreadSheet",
        id: string,
        spreadsheet_name?: string | null,
        templatesID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SpreadSheetRows?:  {
      __typename: "ModelSpreadSheetRowsConnection",
      items:  Array< {
        __typename: "SpreadSheetRows",
        id: string,
        items?: string | null,
        userID: string,
        templatesID: string,
        spreadsheetID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email?: string | null,
    Templates?:  {
      __typename: "ModelTemplatesConnection",
      items:  Array< {
        __typename: "Templates",
        id: string,
        template_name?: string | null,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SpreadSheets?:  {
      __typename: "ModelSpreadSheetConnection",
      items:  Array< {
        __typename: "SpreadSheet",
        id: string,
        spreadsheet_name?: string | null,
        templatesID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SpreadSheetRows?:  {
      __typename: "ModelSpreadSheetRowsConnection",
      items:  Array< {
        __typename: "SpreadSheetRows",
        id: string,
        items?: string | null,
        userID: string,
        templatesID: string,
        spreadsheetID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
