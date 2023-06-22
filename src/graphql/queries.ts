/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSpreadSheetRows = /* GraphQL */ `
  query GetSpreadSheetRows($id: ID!) {
    getSpreadSheetRows(id: $id) {
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
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
export const listSpreadSheetRows = /* GraphQL */ `
  query ListSpreadSheetRows(
    $filter: ModelSpreadSheetRowsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpreadSheetRows(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
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
  }
`;
export const syncSpreadSheetRows = /* GraphQL */ `
  query SyncSpreadSheetRows(
    $filter: ModelSpreadSheetRowsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSpreadSheetRows(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
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
  }
`;
export const spreadSheetRowsByUserID = /* GraphQL */ `
  query SpreadSheetRowsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSpreadSheetRowsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    spreadSheetRowsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
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
  }
`;
export const spreadSheetRowsByTemplatesID = /* GraphQL */ `
  query SpreadSheetRowsByTemplatesID(
    $templatesID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSpreadSheetRowsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    spreadSheetRowsByTemplatesID(
      templatesID: $templatesID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
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
  }
`;
export const spreadSheetRowsBySpreadsheetID = /* GraphQL */ `
  query SpreadSheetRowsBySpreadsheetID(
    $spreadsheetID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSpreadSheetRowsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    spreadSheetRowsBySpreadsheetID(
      spreadsheetID: $spreadsheetID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          soft_Deleted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
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
  }
`;
export const getSpreadSheet = /* GraphQL */ `
  query GetSpreadSheet($id: ID!) {
    getSpreadSheet(id: $id) {
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
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listSpreadSheets = /* GraphQL */ `
  query ListSpreadSheets(
    $filter: ModelSpreadSheetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpreadSheets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSpreadSheets = /* GraphQL */ `
  query SyncSpreadSheets(
    $filter: ModelSpreadSheetFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSpreadSheets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const spreadSheetsByTemplatesID = /* GraphQL */ `
  query SpreadSheetsByTemplatesID(
    $templatesID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSpreadSheetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    spreadSheetsByTemplatesID(
      templatesID: $templatesID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const spreadSheetsByUserID = /* GraphQL */ `
  query SpreadSheetsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSpreadSheetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    spreadSheetsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        spreadsheet_name
        templatesID
        userID
        SpreadSheetRows {
          items {
            id
            soft_Deleted
          }
          nextToken
          startedAt
        }
        soft_Deleted
        Templates {
          id
          template_name
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getTemplateColumns = /* GraphQL */ `
  query GetTemplateColumns($id: ID!) {
    getTemplateColumns(id: $id) {
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
export const listTemplateColumns = /* GraphQL */ `
  query ListTemplateColumns(
    $filter: ModelTemplateColumnsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTemplateColumns(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const syncTemplateColumns = /* GraphQL */ `
  query SyncTemplateColumns(
    $filter: ModelTemplateColumnsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTemplateColumns(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const templateColumnsByTemplatesID = /* GraphQL */ `
  query TemplateColumnsByTemplatesID(
    $templatesID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTemplateColumnsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    templateColumnsByTemplatesID(
      templatesID: $templatesID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getTemplates = /* GraphQL */ `
  query GetTemplates($id: ID!) {
    getTemplates(id: $id) {
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
export const listTemplates = /* GraphQL */ `
  query ListTemplates(
    $filter: ModelTemplatesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTemplates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTemplates = /* GraphQL */ `
  query SyncTemplates(
    $filter: ModelTemplatesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTemplates(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      }
      nextToken
      startedAt
    }
  }
`;
export const templatesByUserID = /* GraphQL */ `
  query TemplatesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTemplatesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    templatesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        Templates {
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        email
        Templates {
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
