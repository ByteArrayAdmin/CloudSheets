/* Amplify Params - DO NOT EDIT
    AUTH_CLOUDSHEETBACKENDENV0BF41396_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');

exports.handler = async (event) => {
    
    try {
        const userPoolId = process.env.AUTH_CLOUDSHEETBACKENDENV0BF41396_USERPOOLID || "void";
        const email = event.queryStringParameters.email;
    
        // Call the ListUsers API to check if the email already exists in the user pool
        const params = {
          UserPoolId: userPoolId,
          Filter: `email = "${email}"`,
        };
    
        console.log("body========", params);
    
        const data = await new AWS.CognitoIdentityServiceProvider().listUsers(params).promise();
        const users = data.Users;
    
        console.log("response==========", users);
    
        return {
          statusCode: 200,
          body: JSON.stringify(users),
        };
      } catch (err) {
        console.log("ErrorResponse==========", err);
    
        return {
          statusCode: 500,
          body: JSON.stringify(err),
        };
      }
};
