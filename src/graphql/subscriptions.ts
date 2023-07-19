/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAppConstants = /* GraphQL */ `
  subscription OnCreateAppConstants(
    $filter: ModelSubscriptionAppConstantsFilterInput
  ) {
    onCreateAppConstants(filter: $filter) {
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
export const onUpdateAppConstants = /* GraphQL */ `
  subscription OnUpdateAppConstants(
    $filter: ModelSubscriptionAppConstantsFilterInput
  ) {
    onUpdateAppConstants(filter: $filter) {
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
export const onDeleteAppConstants = /* GraphQL */ `
  subscription OnDeleteAppConstants(
    $filter: ModelSubscriptionAppConstantsFilterInput
  ) {
    onDeleteAppConstants(filter: $filter) {
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
export const onCreateCustomerSupport = /* GraphQL */ `
  subscription OnCreateCustomerSupport(
    $filter: ModelSubscriptionCustomerSupportFilterInput
  ) {
    onCreateCustomerSupport(filter: $filter) {
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
export const onUpdateCustomerSupport = /* GraphQL */ `
  subscription OnUpdateCustomerSupport(
    $filter: ModelSubscriptionCustomerSupportFilterInput
  ) {
    onUpdateCustomerSupport(filter: $filter) {
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
export const onDeleteCustomerSupport = /* GraphQL */ `
  subscription OnDeleteCustomerSupport(
    $filter: ModelSubscriptionCustomerSupportFilterInput
  ) {
    onDeleteCustomerSupport(filter: $filter) {
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
export const onCreateSpreadSheetRows = /* GraphQL */ `
  subscription OnCreateSpreadSheetRows(
    $filter: ModelSubscriptionSpreadSheetRowsFilterInput
    $owner: String
  ) {
    onCreateSpreadSheetRows(filter: $filter, owner: $owner) {
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
export const onUpdateSpreadSheetRows = /* GraphQL */ `
  subscription OnUpdateSpreadSheetRows(
    $filter: ModelSubscriptionSpreadSheetRowsFilterInput
    $owner: String
  ) {
    onUpdateSpreadSheetRows(filter: $filter, owner: $owner) {
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
export const onDeleteSpreadSheetRows = /* GraphQL */ `
  subscription OnDeleteSpreadSheetRows(
    $filter: ModelSubscriptionSpreadSheetRowsFilterInput
    $owner: String
  ) {
    onDeleteSpreadSheetRows(filter: $filter, owner: $owner) {
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
export const onCreateSpreadSheet = /* GraphQL */ `
  subscription OnCreateSpreadSheet(
    $filter: ModelSubscriptionSpreadSheetFilterInput
    $owner: String
  ) {
    onCreateSpreadSheet(filter: $filter, owner: $owner) {
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
export const onUpdateSpreadSheet = /* GraphQL */ `
  subscription OnUpdateSpreadSheet(
    $filter: ModelSubscriptionSpreadSheetFilterInput
    $owner: String
  ) {
    onUpdateSpreadSheet(filter: $filter, owner: $owner) {
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
export const onDeleteSpreadSheet = /* GraphQL */ `
  subscription OnDeleteSpreadSheet(
    $filter: ModelSubscriptionSpreadSheetFilterInput
    $owner: String
  ) {
    onDeleteSpreadSheet(filter: $filter, owner: $owner) {
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
export const onCreateTemplateColumns = /* GraphQL */ `
  subscription OnCreateTemplateColumns(
    $filter: ModelSubscriptionTemplateColumnsFilterInput
    $owner: String
  ) {
    onCreateTemplateColumns(filter: $filter, owner: $owner) {
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
export const onUpdateTemplateColumns = /* GraphQL */ `
  subscription OnUpdateTemplateColumns(
    $filter: ModelSubscriptionTemplateColumnsFilterInput
    $owner: String
  ) {
    onUpdateTemplateColumns(filter: $filter, owner: $owner) {
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
export const onDeleteTemplateColumns = /* GraphQL */ `
  subscription OnDeleteTemplateColumns(
    $filter: ModelSubscriptionTemplateColumnsFilterInput
    $owner: String
  ) {
    onDeleteTemplateColumns(filter: $filter, owner: $owner) {
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
export const onCreateTemplates = /* GraphQL */ `
  subscription OnCreateTemplates(
    $filter: ModelSubscriptionTemplatesFilterInput
    $owner: String
  ) {
    onCreateTemplates(filter: $filter, owner: $owner) {
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
export const onUpdateTemplates = /* GraphQL */ `
  subscription OnUpdateTemplates(
    $filter: ModelSubscriptionTemplatesFilterInput
    $owner: String
  ) {
    onUpdateTemplates(filter: $filter, owner: $owner) {
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
export const onDeleteTemplates = /* GraphQL */ `
  subscription OnDeleteTemplates(
    $filter: ModelSubscriptionTemplatesFilterInput
    $owner: String
  ) {
    onDeleteTemplates(filter: $filter, owner: $owner) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
