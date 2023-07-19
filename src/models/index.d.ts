import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";





type EagerAppConstants = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AppConstants, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly appLabels?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAppConstants = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AppConstants, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly appLabels?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type AppConstants = LazyLoading extends LazyLoadingDisabled ? EagerAppConstants : LazyAppConstants

export declare const AppConstants: (new (init: ModelInit<AppConstants>) => AppConstants) & {
  copyOf(source: AppConstants, mutator: (draft: MutableModel<AppConstants>) => MutableModel<AppConstants> | void): AppConstants;
}

type EagerCustomerSupport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CustomerSupport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID?: string | null;
  readonly email?: string | null;
  readonly subject?: string | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCustomerSupport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CustomerSupport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID?: string | null;
  readonly email?: string | null;
  readonly subject?: string | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CustomerSupport = LazyLoading extends LazyLoadingDisabled ? EagerCustomerSupport : LazyCustomerSupport

export declare const CustomerSupport: (new (init: ModelInit<CustomerSupport>) => CustomerSupport) & {
  copyOf(source: CustomerSupport, mutator: (draft: MutableModel<CustomerSupport>) => MutableModel<CustomerSupport> | void): CustomerSupport;
}

type EagerSpreadSheetRows = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SpreadSheetRows, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly items?: string | null;
  readonly userID: string;
  readonly templatesID: string;
  readonly spreadsheetID: string;
  readonly SpreadSheet?: SpreadSheet | null;
  readonly soft_Deleted?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySpreadSheetRows = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SpreadSheetRows, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly items?: string | null;
  readonly userID: string;
  readonly templatesID: string;
  readonly spreadsheetID: string;
  readonly SpreadSheet: AsyncItem<SpreadSheet | undefined>;
  readonly soft_Deleted?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SpreadSheetRows = LazyLoading extends LazyLoadingDisabled ? EagerSpreadSheetRows : LazySpreadSheetRows

export declare const SpreadSheetRows: (new (init: ModelInit<SpreadSheetRows>) => SpreadSheetRows) & {
  copyOf(source: SpreadSheetRows, mutator: (draft: MutableModel<SpreadSheetRows>) => MutableModel<SpreadSheetRows> | void): SpreadSheetRows;
}

type EagerSpreadSheet = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SpreadSheet, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly spreadsheet_name?: string | null;
  readonly templatesID: string;
  readonly userID: string;
  readonly SpreadSheetRows?: (SpreadSheetRows | null)[] | null;
  readonly soft_Deleted?: boolean | null;
  readonly Templates?: Templates | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySpreadSheet = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SpreadSheet, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly spreadsheet_name?: string | null;
  readonly templatesID: string;
  readonly userID: string;
  readonly SpreadSheetRows: AsyncCollection<SpreadSheetRows>;
  readonly soft_Deleted?: boolean | null;
  readonly Templates: AsyncItem<Templates | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SpreadSheet = LazyLoading extends LazyLoadingDisabled ? EagerSpreadSheet : LazySpreadSheet

export declare const SpreadSheet: (new (init: ModelInit<SpreadSheet>) => SpreadSheet) & {
  copyOf(source: SpreadSheet, mutator: (draft: MutableModel<SpreadSheet>) => MutableModel<SpreadSheet> | void): SpreadSheet;
}

type EagerTemplateColumns = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TemplateColumns, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly column_Name?: string | null;
  readonly column_Type?: string | null;
  readonly templatesID: string;
  readonly soft_Deleted?: boolean | null;
  readonly userID: string;
  readonly column_Index?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTemplateColumns = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TemplateColumns, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly column_Name?: string | null;
  readonly column_Type?: string | null;
  readonly templatesID: string;
  readonly soft_Deleted?: boolean | null;
  readonly userID: string;
  readonly column_Index?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TemplateColumns = LazyLoading extends LazyLoadingDisabled ? EagerTemplateColumns : LazyTemplateColumns

export declare const TemplateColumns: (new (init: ModelInit<TemplateColumns>) => TemplateColumns) & {
  copyOf(source: TemplateColumns, mutator: (draft: MutableModel<TemplateColumns>) => MutableModel<TemplateColumns> | void): TemplateColumns;
}

type EagerTemplates = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Templates, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly template_name?: string | null;
  readonly userID: string;
  readonly TemplateColumns?: (TemplateColumns | null)[] | null;
  readonly SpreadSheets?: (SpreadSheet | null)[] | null;
  readonly SpreadSheetRows?: (SpreadSheetRows | null)[] | null;
  readonly soft_Deleted?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTemplates = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Templates, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly template_name?: string | null;
  readonly userID: string;
  readonly TemplateColumns: AsyncCollection<TemplateColumns>;
  readonly SpreadSheets: AsyncCollection<SpreadSheet>;
  readonly SpreadSheetRows: AsyncCollection<SpreadSheetRows>;
  readonly soft_Deleted?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Templates = LazyLoading extends LazyLoadingDisabled ? EagerTemplates : LazyTemplates

export declare const Templates: (new (init: ModelInit<Templates>) => Templates) & {
  copyOf(source: Templates, mutator: (draft: MutableModel<Templates>) => MutableModel<Templates> | void): Templates;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly Templates?: (Templates | null)[] | null;
  readonly SpreadSheets?: (SpreadSheet | null)[] | null;
  readonly SpreadSheetRows?: (SpreadSheetRows | null)[] | null;
  readonly TemplateColumns?: (TemplateColumns | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly Templates: AsyncCollection<Templates>;
  readonly SpreadSheets: AsyncCollection<SpreadSheet>;
  readonly SpreadSheetRows: AsyncCollection<SpreadSheetRows>;
  readonly TemplateColumns: AsyncCollection<TemplateColumns>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}