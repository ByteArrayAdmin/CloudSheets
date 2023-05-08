/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTemplates = /* GraphQL */ `
  mutation CreateTemplates(
    $input: CreateTemplatesInput!
    $condition: ModelTemplatesConditionInput
  ) {
    createTemplates(input: $input, condition: $condition) {
      id
      template_name
      userID
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
