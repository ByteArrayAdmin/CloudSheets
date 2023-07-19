/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAppConstants = /* GraphQL */ `
  mutation CreateAppConstants(
    $input: CreateAppConstantsInput!
    $condition: ModelAppConstantsConditionInput
  ) {
    createAppConstants(input: $input, condition: $condition) {
      id
      appLabels
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateAppConstants = /* GraphQL */ `
  mutation UpdateAppConstants(
    $input: UpdateAppConstantsInput!
    $condition: ModelAppConstantsConditionInput
  ) {
    updateAppConstants(input: $input, condition: $condition) {
      id
      appLabels
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteAppConstants = /* GraphQL */ `
  mutation DeleteAppConstants(
    $input: DeleteAppConstantsInput!
    $condition: ModelAppConstantsConditionInput
  ) {
    deleteAppConstants(input: $input, condition: $condition) {
      id
      appLabels
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createCustomerSupport = /* GraphQL */ `
  mutation CreateCustomerSupport(
    $input: CreateCustomerSupportInput!
    $condition: ModelCustomerSupportConditionInput
  ) {
    createCustomerSupport(input: $input, condition: $condition) {
      id
      userID
      email
      subject
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateCustomerSupport = /* GraphQL */ `
  mutation UpdateCustomerSupport(
    $input: UpdateCustomerSupportInput!
    $condition: ModelCustomerSupportConditionInput
  ) {
    updateCustomerSupport(input: $input, condition: $condition) {
      id
      userID
      email
      subject
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteCustomerSupport = /* GraphQL */ `
  mutation DeleteCustomerSupport(
    $input: DeleteCustomerSupportInput!
    $condition: ModelCustomerSupportConditionInput
  ) {
    deleteCustomerSupport(input: $input, condition: $condition) {
      id
      userID
      email
      subject
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createSpreadSheetRows = /* GraphQL */ `
  mutation CreateSpreadSheetRows(
    $input: CreateSpreadSheetRowsInput!
    $condition: ModelSpreadSheetRowsConditionInput
  ) {
    createSpreadSheetRows(input: $input, condition: $condition) {
      id
      items
      userID
      templatesID
      spreadsheetID
      SpreadSheet {
        id
        spreadsheet_name
        templatesID
        userID
        SpreadSheetRows {
          nextToken
          startedAt
        }
        soft_Deleted
        Templates {
          id
          template_name
          userID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      soft_Deleted
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateSpreadSheetRows = /* GraphQL */ `
  mutation UpdateSpreadSheetRows(
    $input: UpdateSpreadSheetRowsInput!
    $condition: ModelSpreadSheetRowsConditionInput
  ) {
    updateSpreadSheetRows(input: $input, condition: $condition) {
      id
      items
      userID
      templatesID
      spreadsheetID
      SpreadSheet {
        id
        spreadsheet_name
        templatesID
        userID
        SpreadSheetRows {
          nextToken
          startedAt
        }
        soft_Deleted
        Templates {
          id
          template_name
          userID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      soft_Deleted
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteSpreadSheetRows = /* GraphQL */ `
  mutation DeleteSpreadSheetRows(
    $input: DeleteSpreadSheetRowsInput!
    $condition: ModelSpreadSheetRowsConditionInput
  ) {
    deleteSpreadSheetRows(input: $input, condition: $condition) {
      id
      items
      userID
      templatesID
      spreadsheetID
      SpreadSheet {
        id
        spreadsheet_name
        templatesID
        userID
        SpreadSheetRows {
          nextToken
          startedAt
        }
        soft_Deleted
        Templates {
          id
          template_name
          userID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      soft_Deleted
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createSpreadSheet = /* GraphQL */ `
  mutation CreateSpreadSheet(
    $input: CreateSpreadSheetInput!
    $condition: ModelSpreadSheetConditionInput
  ) {
    createSpreadSheet(input: $input, condition: $condition) {
      id
      spreadsheet_name
      templatesID
      userID
      SpreadSheetRows {
        items {
          id
          items
          userID
          templatesID
          spreadsheetID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      soft_Deleted
      Templates {
        id
        template_name
        userID
        TemplateColumns {
          nextToken
          startedAt
        }
        SpreadSheets {
          nextToken
          startedAt
        }
        SpreadSheetRows {
          nextToken
          startedAt
        }
        soft_Deleted
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateSpreadSheet = /* GraphQL */ `
  mutation UpdateSpreadSheet(
    $input: UpdateSpreadSheetInput!
    $condition: ModelSpreadSheetConditionInput
  ) {
    updateSpreadSheet(input: $input, condition: $condition) {
      id
      spreadsheet_name
      templatesID
      userID
      SpreadSheetRows {
        items {
          id
          items
          userID
          templatesID
          spreadsheetID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      soft_Deleted
      Templates {
        id
        template_name
        userID
        TemplateColumns {
          nextToken
          startedAt
        }
        SpreadSheets {
          nextToken
          startedAt
        }
        SpreadSheetRows {
          nextToken
          startedAt
        }
        soft_Deleted
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteSpreadSheet = /* GraphQL */ `
  mutation DeleteSpreadSheet(
    $input: DeleteSpreadSheetInput!
    $condition: ModelSpreadSheetConditionInput
  ) {
    deleteSpreadSheet(input: $input, condition: $condition) {
      id
      spreadsheet_name
      templatesID
      userID
      SpreadSheetRows {
        items {
          id
          items
          userID
          templatesID
          spreadsheetID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      soft_Deleted
      Templates {
        id
        template_name
        userID
        TemplateColumns {
          nextToken
          startedAt
        }
        SpreadSheets {
          nextToken
          startedAt
        }
        SpreadSheetRows {
          nextToken
          startedAt
        }
        soft_Deleted
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createTemplateColumns = /* GraphQL */ `
  mutation CreateTemplateColumns(
    $input: CreateTemplateColumnsInput!
    $condition: ModelTemplateColumnsConditionInput
  ) {
    createTemplateColumns(input: $input, condition: $condition) {
      id
      column_Name
      column_Type
      templatesID
      soft_Deleted
      userID
      column_Index
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateTemplateColumns = /* GraphQL */ `
  mutation UpdateTemplateColumns(
    $input: UpdateTemplateColumnsInput!
    $condition: ModelTemplateColumnsConditionInput
  ) {
    updateTemplateColumns(input: $input, condition: $condition) {
      id
      column_Name
      column_Type
      templatesID
      soft_Deleted
      userID
      column_Index
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteTemplateColumns = /* GraphQL */ `
  mutation DeleteTemplateColumns(
    $input: DeleteTemplateColumnsInput!
    $condition: ModelTemplateColumnsConditionInput
  ) {
    deleteTemplateColumns(input: $input, condition: $condition) {
      id
      column_Name
      column_Type
      templatesID
      soft_Deleted
      userID
      column_Index
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createTemplates = /* GraphQL */ `
  mutation CreateTemplates(
    $input: CreateTemplatesInput!
    $condition: ModelTemplatesConditionInput
  ) {
    createTemplates(input: $input, condition: $condition) {
      id
      template_name
      userID
      TemplateColumns {
        items {
          id
          column_Name
          column_Type
          templatesID
          soft_Deleted
          userID
          column_Index
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      SpreadSheets {
        items {
          id
          spreadsheet_name
          templatesID
          userID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      SpreadSheetRows {
        items {
          id
          items
          userID
          templatesID
          spreadsheetID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      soft_Deleted
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateTemplates = /* GraphQL */ `
  mutation UpdateTemplates(
    $input: UpdateTemplatesInput!
    $condition: ModelTemplatesConditionInput
  ) {
    updateTemplates(input: $input, condition: $condition) {
      id
      template_name
      userID
      TemplateColumns {
        items {
          id
          column_Name
          column_Type
          templatesID
          soft_Deleted
          userID
          column_Index
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      SpreadSheets {
        items {
          id
          spreadsheet_name
          templatesID
          userID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      SpreadSheetRows {
        items {
          id
          items
          userID
          templatesID
          spreadsheetID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      soft_Deleted
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteTemplates = /* GraphQL */ `
  mutation DeleteTemplates(
    $input: DeleteTemplatesInput!
    $condition: ModelTemplatesConditionInput
  ) {
    deleteTemplates(input: $input, condition: $condition) {
      id
      template_name
      userID
      TemplateColumns {
        items {
          id
          column_Name
          column_Type
          templatesID
          soft_Deleted
          userID
          column_Index
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      SpreadSheets {
        items {
          id
          spreadsheet_name
          templatesID
          userID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      SpreadSheetRows {
        items {
          id
          items
          userID
          templatesID
          spreadsheetID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      soft_Deleted
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      email
      Templates {
        items {
          id
          template_name
          userID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      SpreadSheets {
        items {
          id
          spreadsheet_name
          templatesID
          userID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      SpreadSheetRows {
        items {
          id
          items
          userID
          templatesID
          spreadsheetID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      TemplateColumns {
        items {
          id
          column_Name
          column_Type
          templatesID
          soft_Deleted
          userID
          column_Index
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      email
      Templates {
        items {
          id
          template_name
          userID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      SpreadSheets {
        items {
          id
          spreadsheet_name
          templatesID
          userID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      SpreadSheetRows {
        items {
          id
          items
          userID
          templatesID
          spreadsheetID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      TemplateColumns {
        items {
          id
          column_Name
          column_Type
          templatesID
          soft_Deleted
          userID
          column_Index
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      email
      Templates {
        items {
          id
          template_name
          userID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      SpreadSheets {
        items {
          id
          spreadsheet_name
          templatesID
          userID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      SpreadSheetRows {
        items {
          id
          items
          userID
          templatesID
          spreadsheetID
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      TemplateColumns {
        items {
          id
          column_Name
          column_Type
          templatesID
          soft_Deleted
          userID
          column_Index
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
