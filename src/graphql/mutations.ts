/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      soft_Deleted
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      soft_Deleted
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      soft_Deleted
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
