import {  Auth, API, graphqlOperation } from 'aws-amplify';
import {
    listUsers,
    getUser,
    templatesByUserID,
    templateColumnsByTemplatesID,
    spreadSheetRowsBySpreadsheetID,
    spreadSheetsByUserID,
    spreadSheetsByTemplatesID,
    spreadSheetRowsBySpreadSheetID_SoftDelete,
    templateColumnsByTemplatesID_SoftDelete,
    spreadSheetsByTemplatesID_SoftDelete,
    spreadSheetRowsByTemplatesID_SoftDelete
} from '../graphql/queries';
import {
    createTemplates,
    updateTemplates,
    deleteTemplates,
    createTemplateColumns,
    createSpreadSheet,
    createSpreadSheetRows,
    updateSpreadSheetRows,
    updateSpreadSheet,
    updateTemplateColumns,
    updateUser

} from '../graphql/mutations';
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

export const updateCurrentAuth = (data: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            const updateCurrUser = await Auth.updateUserAttributes(user, data)
            let obj = { status: updateCurrUser, detail: user }
            resolve(obj);
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
            const filter = {
                soft_Deleted: {
                    eq: false
                }
            };
            const getTemplate = await API.graphql(graphqlOperation(templatesByUserID, { userID: userId, filter: filter }))
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

// export const delete_Template = async (newTemplate: any) => {
//     console.log("newTemp=======", newTemplate)
//     const templateDetails: DeleteTemplatesInput = {
//         id: newTemplate.id,
//         _version:newTemplate._version
//     };

//     return new Promise(async (resolve, reject) => {
//         try {
//             const deleteTemplate = await API.graphql<GraphQLQuery<DeleteTemplatesMutation>>({ 
//                 query: deleteTemplates, 
//                 variables: { input: templateDetails }
//               });
//             resolve(deleteTemplate);
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// ------------------Template Column Section Api start----------------
export const create_Template_Column = async (newTemplateCol: any) => {

    return new Promise(async (resolve, reject) => {
        try {

            const txnMutation: any = newTemplateCol.map((txn: any, i: any) => {
                const dumStr = `mutation${i}: createTemplateColumns(input: {id: "${txn.id}", column_Name:"${txn.column_Name}", templatesID:"${txn.templatesID}", column_Type:"${txn.column_Type}", soft_Deleted:${txn.soft_Deleted}}) { id,column_Name,templatesID,column_Type,soft_Deleted }`;
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
            const filter = {
                soft_Deleted: {
                    eq: false
                }
            };
            const getColumn = await API.graphql(graphqlOperation(templateColumnsByTemplatesID, { templatesID: templateId, filter: filter }))
            resolve(getColumn);
        } catch (e) {
            reject(e);
        }
    })
}

export const templateColumn_softDelete = async (updateColumn: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const softDeleteTemplateColumn = await API.graphql(graphqlOperation(updateTemplateColumns, { input: updateColumn }))
            resolve(softDeleteTemplateColumn);
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

export const update_SpreadSheet = async (newSpreadSheet: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateSpreadsheet = await API.graphql(graphqlOperation(updateSpreadSheet, { input: newSpreadSheet }))
            resolve(updateSpreadsheet);
        } catch (e) {
            reject(e);
        }
    })
}

export const get_CloudsheetByUserID = async (userId: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const filter = {
                soft_Deleted: {
                    eq: false
                }
            };
            const getCloudsheet = await API.graphql(graphqlOperation(spreadSheetsByUserID, { userID: userId, filter: filter }))
            resolve(getCloudsheet);
        } catch (e) {
            reject(e);
        }
    })
}

export const getCloudsheetByTemplateID = async (templateId: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const filter = {
                soft_Deleted: {
                    eq: false
                }
            };
            const getCloudsheet = await API.graphql(graphqlOperation(spreadSheetsByTemplatesID, { templatesID: templateId, filter: filter }))
            resolve(getCloudsheet);
        } catch (e) {
            reject(e);
        }
    })
}

export const spreadSheet_softDelete = (softDelete_SpreadSheet: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const softDeleteSpreadSheet = await API.graphql(graphqlOperation(updateSpreadSheet, { input: softDelete_SpreadSheet }))
            resolve(softDeleteSpreadSheet);
        } catch (e) {
            reject(e);
        }
    })
}
export const softDelete_spreadSheet_and_rows = (spreadSheetRowData: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const txnMutation: any = spreadSheetRowData.map((txn: any, i: any) => {
                const dumStr = `mutation${i}: updateSpreadSheetRows(input: {id: "${txn.id}", soft_Deleted:${txn.soft_Deleted}, _version:${txn._version}}) { id,soft_Deleted,_version }`;
                console.log("updateMutation============", dumStr)
                return dumStr;
            });
            const softDelete_spreadSheetRow = await API.graphql(graphqlOperation(`mutation batchMutation {
                ${txnMutation}}`))
            resolve(softDelete_spreadSheetRow);
        } catch (e) {
            reject(e);
        }
    })
}

// ------------------SpreadSheetRow Section Api start----------------
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
            const filter = {
                soft_Deleted: {
                    eq: false
                }
            };
            const getSpreadsheet = await API.graphql(graphqlOperation(spreadSheetRowsBySpreadsheetID, { spreadsheetID: spreadSheetId, filter: filter }))
            resolve(getSpreadsheet);
        } catch (e) {
            reject(e);
        }
    })
}

export const spreadSheetRow_Count = (spreadSheetId: any)=>{
    return new Promise(async (resolve, reject) => {
        try {
            const filter = {
                soft_Deleted: {
                    eq: false
                }
            };
            const getSpreadsheet = await API.graphql(graphqlOperation(spreadSheetRowsBySpreadsheetID, { spreadsheetID: spreadSheetId, filter: filter }))
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

export const spreadSheetRow_softDelete = (softDelete_SpreadSheetRow: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const softDeleteSpreadSheetRow = await API.graphql(graphqlOperation(updateSpreadSheetRows, { input: softDelete_SpreadSheetRow }))
            resolve(softDeleteSpreadSheetRow);
        } catch (e) {
            reject(e);
        }
    })
}

export const getSpreadsheetRow_bySpreadsheetId_forSoftDelete = (spreadSheetId: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const filter = {
                soft_Deleted: {
                    eq: false
                }
            };
            const getSpreadsheet = await API.graphql(graphqlOperation(spreadSheetRowsBySpreadsheetID, { spreadsheetID: spreadSheetId, filter: filter }))
            resolve(getSpreadsheet);
        } catch (e) {
            reject(e);
        }
    })
}

// ---------------- Soft Delete Template ----------------

export const soft_delete_template = async (template: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const filter = {
                soft_Deleted: {
                    eq: false
                }
            };
            console.log("templatedDeleted1===========", template)
            // const getColumn = await API.graphql(graphqlOperation(templateColumnsByTemplatesID_SoftDelete, { templatesID: template.id, filter: filter }))
            // let columnList = getColumn.data.templateColumnsByTemplatesID.items

            const getSpreadSheet = await API.graphql(graphqlOperation(spreadSheetsByTemplatesID, { templatesID: template.id, filter: filter }))


            let spreadSheetList = getSpreadSheet.data.spreadSheetsByTemplatesID.items

            console.log("spreadsheetList========", spreadSheetList)

            // const getSpreadSheetRow = await API.graphql(graphqlOperation(spreadSheetRowsByTemplatesID_SoftDelete, { templatesID: template.id, filter: filter }))
            // let spreadSheetRowList = getSpreadSheetRow.data.spreadSheetRowsByTemplatesID.items

            // if (columnList.length > 0) {
            //     columnList.forEach((element: any) => {
            //         element.soft_Deleted = true
            //     });
            //     console.log("ColmList======", columnList)
            //     const txnMutation: any = columnList.map((txn: any, i: any) => {
            //         const updatedCol = `mutation${i}: updateTemplateColumns(input: {id: "${txn.id}", soft_Deleted:${txn.soft_Deleted}, _version:${txn._version}, }) { id,soft_Deleted,_version }`;
            //         console.log("updateMutation============", updatedCol)
            //         return updatedCol;
            //     });
            //     const updatedColumn = await API.graphql(graphqlOperation(`mutation batchMutation {
            //         ${txnMutation}}`))
            // }
            if (spreadSheetList.length > 0) {
                spreadSheetList.forEach((element: any) => {
                    element.soft_Deleted = true
                });
                const txnMutation: any = spreadSheetList.map((txn: any, i: any) => {
                    const updateSpreadsheet = `mutation${i}: updateSpreadSheet(input: {id: "${txn.id}", soft_Deleted:${txn.soft_Deleted}, _version:${txn._version} }) { id,soft_Deleted,_version }`;
                    console.log("updateMutation============", updateSpreadsheet)
                    return updateSpreadsheet;
                });
                const updatedSpreadSheet = await API.graphql(graphqlOperation(`mutation batchMutation {
                    ${txnMutation}}`))
                console.log("spreadSheetList======", spreadSheetList)
            }
            // if (spreadSheetRowList.length > 0) {
            //     spreadSheetRowList.forEach((element: any) => {
            //         element.soft_Deleted = true
            //     });
            //     console.log("spreadSheetRowList======", spreadSheetRowList)
            //     const txnMutation: any = spreadSheetRowList.map((txn: any, i: any) => {
            //         const updateSpreadsheetRow = `mutation${i}: updateSpreadSheetRows(input: {id: "${txn.id}", soft_Deleted:${txn.soft_Deleted}, _version:${txn._version} }) { id,soft_Deleted,_version }`;
            //         console.log("updateMutation============", updateSpreadsheetRow)
            //         return updateSpreadsheetRow;
            //     });
            //     const updatedSpreadSheet = await API.graphql(graphqlOperation(`mutation batchMutation {
            //         ${txnMutation}}`))
            // }
            const updateTemplate = await API.graphql(graphqlOperation(updateTemplates, { input: template }))
            resolve(updateTemplate);

        } catch (e) {
            reject(e);
        }
    })

}

// ----------- user Table -----------
export const updateUserDetail = (userData: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateCurrUser = await API.graphql(graphqlOperation(updateUser, { input: userData }))
            resolve(updateCurrUser);
        } catch (e) {
            reject(e);
        }
    })
}

export const get_user_from_table = (userId: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getUserTab = await API.graphql(graphqlOperation(getUser, { id: userId }))
            resolve(getUserTab);
        } catch (e) {
            reject(e);
        }
    })
}

// ----------- Search SpreadSheet by UserId -----------
export const search_CloudsheetByUserID = async (userId: string, cloudSheetName: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const filter = {
                soft_Deleted: {
                    eq: false
                },
                spreadsheet_name: {
                    beginsWith: cloudSheetName,
                }
            };
            const getCloudsheet = await API.graphql(graphqlOperation(spreadSheetsByUserID, { userID: userId, filter: filter }))
            resolve(getCloudsheet);
        } catch (e) {
            reject(e);
        }
    })
}

// -------------- Get Location by lat long -------------

export const get_Location_Address = async (currentLatitude: any, currentLongitude: any) => {
    console.log("currentPosition==========", currentLatitude, currentLongitude)
    let newLat = parseInt(currentLatitude)
    let newLong = parseInt(currentLongitude)
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    // return fetch(`https://api.opencagedata.com/geocode/v1/json?key=${'1f8e7aadef8a4509ab241e33602720b0'}&q=${22.7222948 + 75.8577413}&pretty=1&no_annotations=1`, requestOptions)
    return fetch(`https://api.opencagedata.com/geocode/v1/json?key=1f8e7aadef8a4509ab241e33602720b0&q=${newLat}+${newLong}&pretty=1&no_annotations=1`, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

// -------------- Forget Password --------------
export const forgetPassword_sendEmail  = async(email: string)=>{
    return new Promise(async (resolve, reject) => {
        try {
            const sendEmail = await Auth.forgotPassword(email)
            resolve(sendEmail);
        } catch (e) {
            reject(e);
        }
    })
}

// ------------ forget password submit ----------
export const forgetPassword_submit  = async(username: string,code:any,newPassword:any)=>{
    return new Promise(async (resolve, reject) => {
        try {
            const submitPassword = await Auth.forgotPasswordSubmit(username, code, newPassword)
            resolve(submitPassword);
        } catch (e) {
            reject(e);
        }
    })
}