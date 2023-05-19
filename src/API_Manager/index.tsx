import { Amplify, Auth, API, graphqlOperation, DataStore } from 'aws-amplify';
import { listUsers, getUser, templatesByUserID, templateColumnsByTemplatesID, spreadSheetRowsBySpreadsheetID, spreadSheetsByUserID,spreadSheetsByTemplatesID } from '../graphql/queries';
import { createTemplates, updateTemplates, deleteTemplates, createTemplateColumns, createSpreadSheet, createSpreadSheetRows ,updateSpreadSheetRows} from '../graphql/mutations';
import { DeleteTemplatesInput, DeleteTemplatesMutation } from '../API';
import { GraphQLQuery } from '@aws-amplify/api';
import { Templates } from '../models/index';

// ------------------Auth Section Api start----------------
export const userLogin = async (data: any) => {
    const { youremail, yourpasswaord } = data;
    return new Promise(async (resolve, reject) => {
        try {
            const login = await Auth.signIn(youremail, yourpasswaord)
            resolve(login);
        } catch (e) {
            reject(e);
        }
    })
}

export const userSignup = async (userSignUp: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const signUp = await Auth.signUp(userSignUp);
            resolve(signUp);
        } catch (e) {
            reject(e);
        }
    })
}

export const userExist = async (userName: any, temp_code: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userExist = await Auth.confirmSignUp(userName, temp_code, { forceAliasCreation: false })
            resolve(userExist);
        } catch (e) {
            reject(e);
        }
    })
}

export const confirm_Signup = (userName: any, otp: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const confirmSignUp = await Auth.confirmSignUp(userName, otp);
            resolve(confirmSignUp);
        } catch (e) {
            reject(e);
        }
    })
}

export const resend_OTP = (userName: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resendOTP = await Auth.resendSignUp(userName);
            resolve(resendOTP);
        } catch (e) {
            reject(e);
        }
    })
}

export const current_UserInfo = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentUserInfo = await Auth.currentUserInfo()
            resolve(currentUserInfo);
        } catch (e) {
            reject(e);
        }
    })
}

// ------------------Template Section Api start----------------


export const create_Template = async (newTemplate: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const createTemplate = await API.graphql(graphqlOperation(createTemplates, { input: newTemplate }))
            resolve(createTemplate);
        } catch (e) {
            reject(e);
        }
    })
}

export const get_Template_List = async (userId: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getTemplate = await API.graphql(graphqlOperation(templatesByUserID, { userID: userId }))
            resolve(getTemplate);
        } catch (e) {
            reject(e);
        }
    })
}

export const update_Template = async (newTemplate: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateTemplate = await API.graphql(graphqlOperation(updateTemplates, { input: newTemplate }))
            resolve(updateTemplate);
        } catch (e) {
            reject(e);
        }
    })
}

export const delete_Template = async (newTemplate: any) => {
    console.log("newTemp=======", newTemplate)

    const templateDetails: DeleteTemplatesInput = {
        id: newTemplate.id,
        _version:newTemplate._version
    };

    return new Promise(async (resolve, reject) => {
        try {

            const deleteTemplate = await API.graphql<GraphQLQuery<DeleteTemplatesMutation>>({ 
                query: deleteTemplates, 
                variables: { input: templateDetails }
              });

            resolve(deleteTemplate);
        } catch (e) {
            reject(e);
        }
    })
}

// ------------------Template Column Section Api start----------------

export const create_Template_Column = async (newTemplateCol: any) => {

    return new Promise(async (resolve, reject) => {
        try {

            const txnMutation: any = newTemplateCol.map((txn: any, i: any) => {
                const dumStr = `mutation${i}: createTemplateColumns(input: {id: "${txn.id}", column_Name:"${txn.column_Name}", templatesID:"${txn.templatesID}" column_Type:"${txn.column_Type}"}) { id,column_Name,templatesID,column_Type }`;
                console.log("updateMutation============", dumStr)
                return dumStr;
            });

            const createTemplate = await API.graphql(graphqlOperation(`mutation batchMutation {
                ${txnMutation}}`))
            resolve(createTemplate);
        } catch (e) {
            reject(e);
        }
    })
}

export const get_ColumnByTemplateId = async (templateId: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getColumn = await API.graphql(graphqlOperation(templateColumnsByTemplatesID, { templatesID: templateId }))
            resolve(getColumn);
        } catch (e) {
            reject(e);
        }
    })
}

// ------------------SpreadSheet Section Api start----------------

export const create_SpreadSheet = async (newSpreadSheet: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const createSpreadsheet = await API.graphql(graphqlOperation(createSpreadSheet, { input: newSpreadSheet }))
            resolve(createSpreadsheet);
        } catch (e) {
            reject(e);
        }
    })
}

export const get_CloudsheetByUserID = async (userId: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getCloudsheet = await API.graphql(graphqlOperation(spreadSheetsByUserID, { userID: userId }))
            resolve(getCloudsheet);
        } catch (e) {
            reject(e);
        }
    })
}

export const getCloudsheetByTemplateID = async(templateId: any)=>{
    return new Promise(async (resolve, reject) => {
        try {
            const getCloudsheet = await API.graphql(graphqlOperation(spreadSheetsByTemplatesID, { templatesID: templateId }))
            resolve(getCloudsheet);
        } catch (e) {
            reject(e);
        }
    })
}

// ------------------SpreadSheet Section Api start----------------

export const create_SpreadSheet_Row = async (newSpreadSheetRow: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const createSpreadsheet = await API.graphql(graphqlOperation(createSpreadSheetRows, { input: newSpreadSheetRow }))
            resolve(createSpreadsheet);
        } catch (e) {
            reject(e);
        }
    })
}

export const get_SpreadSheetRowBySpreadSheetId = async (spreadSheetId: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getSpreadsheet = await API.graphql(graphqlOperation(spreadSheetRowsBySpreadsheetID, { spreadsheetID: spreadSheetId }))
            resolve(getSpreadsheet);
        } catch (e) {
            reject(e);
        }
    })
}

export const update_SpreadSheetRow = async (updateSpreadSheetRow: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateSpreadSheetRowData = await API.graphql(graphqlOperation(updateSpreadSheetRows, { input: updateSpreadSheetRow }))
            resolve(updateSpreadSheetRowData);
        } catch (e) {
            reject(e);
        }
    })
}