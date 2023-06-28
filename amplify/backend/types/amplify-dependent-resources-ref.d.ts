export type AmplifyDependentResourcesAttributes = {
  "analytics": {
    "cloudsheetEventTracking": {
      "Id": "string",
      "Region": "string",
      "appName": "string"
    }
  },
  "api": {
    "CloudSheetBackendEnv": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    },
    "checkEmailExist": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "checkUserNameExist": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    }
  },
  "function": {
    "checkEmailExistFunction": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "checkUserNameExistFunction": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  }
}