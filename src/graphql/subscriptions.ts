/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSpreadSheetRows = /* GraphQL */ `
  subscription OnCreateSpreadSheetRows(
    $filter: ModelSubscriptionSpreadSheetRowsFilterInput
  ) {
    onCreateSpreadSheetRows(filter: $filter) {
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
export const onUpdateSpreadSheetRows = /* GraphQL */ `
  subscription OnUpdateSpreadSheetRows(
    $filter: ModelSubscriptionSpreadSheetRowsFilterInput
  ) {
    onUpdateSpreadSheetRows(filter: $filter) {
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
export const onDeleteSpreadSheetRows = /* GraphQL */ `
  subscription OnDeleteSpreadSheetRows(
    $filter: ModelSubscriptionSpreadSheetRowsFilterInput
  ) {
    onDeleteSpreadSheetRows(filter: $filter) {
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
export const onCreateSpreadSheet = /* GraphQL */ `
  subscription OnCreateSpreadSheet(
    $filter: ModelSubscriptionSpreadSheetFilterInput
  ) {
    onCreateSpreadSheet(filter: $filter) {
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
export const onUpdateSpreadSheet = /* GraphQL */ `
  subscription OnUpdateSpreadSheet(
    $filter: ModelSubscriptionSpreadSheetFilterInput
  ) {
    onUpdateSpreadSheet(filter: $filter) {
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
export const onDeleteSpreadSheet = /* GraphQL */ `
  subscription OnDeleteSpreadSheet(
    $filter: ModelSubscriptionSpreadSheetFilterInput
  ) {
    onDeleteSpreadSheet(filter: $filter) {
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
export const onCreateTemplateColumns = /* GraphQL */ `
  subscription OnCreateTemplateColumns(
    $filter: ModelSubscriptionTemplateColumnsFilterInput
  ) {
    onCreateTemplateColumns(filter: $filter) {
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
export const onUpdateTemplateColumns = /* GraphQL */ `
  subscription OnUpdateTemplateColumns(
    $filter: ModelSubscriptionTemplateColumnsFilterInput
  ) {
    onUpdateTemplateColumns(filter: $filter) {
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
export const onDeleteTemplateColumns = /* GraphQL */ `
  subscription OnDeleteTemplateColumns(
    $filter: ModelSubscriptionTemplateColumnsFilterInput
  ) {
    onDeleteTemplateColumns(filter: $filter) {
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
export const onCreateTemplates = /* GraphQL */ `
  subscription OnCreateTemplates(
    $filter: ModelSubscriptionTemplatesFilterInput
  ) {
    onCreateTemplates(filter: $filter) {
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
export const onUpdateTemplates = /* GraphQL */ `
  subscription OnUpdateTemplates(
    $filter: ModelSubscriptionTemplatesFilterInput
  ) {
    onUpdateTemplates(filter: $filter) {
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
export const onDeleteTemplates = /* GraphQL */ `
  subscription OnDeleteTemplates(
    $filter: ModelSubscriptionTemplatesFilterInput
  ) {
    onDeleteTemplates(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
