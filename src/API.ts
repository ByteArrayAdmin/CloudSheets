/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

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

export type Templates = {
  __typename: "Templates",
  id: string,
  template_name?: string | null,
  userID: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
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

export type ModelTemplatesFilterInput = {
  id?: ModelIDInput | null,
  template_name?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelTemplatesFilterInput | null > | null,
  or?: Array< ModelTemplatesFilterInput | null > | null,
  not?: ModelTemplatesFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSubscriptionTemplatesFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  template_name?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionTemplatesFilterInput | null > | null,
  or?: Array< ModelSubscriptionTemplatesFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
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
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
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
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetTemplatesQueryVariables = {
  id: string,
};

export type GetTemplatesQuery = {
  getTemplates?:  {
    __typename: "Templates",
    id: string,
    template_name?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListTemplatesQueryVariables = {
  filter?: ModelTemplatesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTemplatesQuery = {
  listTemplates?:  {
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
};

export type SyncTemplatesQueryVariables = {
  filter?: ModelTemplatesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncTemplatesQuery = {
  syncTemplates?:  {
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
};

export type TemplatesByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTemplatesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TemplatesByUserIDQuery = {
  templatesByUserID?:  {
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
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name?: string | null,
      email?: string | null,
      Templates?:  {
        __typename: "ModelTemplatesConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUsersQuery = {
  syncUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name?: string | null,
      email?: string | null,
      Templates?:  {
        __typename: "ModelTemplatesConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateTemplatesSubscriptionVariables = {
  filter?: ModelSubscriptionTemplatesFilterInput | null,
};

export type OnCreateTemplatesSubscription = {
  onCreateTemplates?:  {
    __typename: "Templates",
    id: string,
    template_name?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateTemplatesSubscriptionVariables = {
  filter?: ModelSubscriptionTemplatesFilterInput | null,
};

export type OnUpdateTemplatesSubscription = {
  onUpdateTemplates?:  {
    __typename: "Templates",
    id: string,
    template_name?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteTemplatesSubscriptionVariables = {
  filter?: ModelSubscriptionTemplatesFilterInput | null,
};

export type OnDeleteTemplatesSubscription = {
  onDeleteTemplates?:  {
    __typename: "Templates",
    id: string,
    template_name?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
