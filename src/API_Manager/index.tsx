import { Auth, API, graphqlOperation } from "aws-amplify";
import {
  listUsers,
  getUser,
  templatesByUserID,
  templateColumnsByTemplatesID,
  spreadSheetRowsBySpreadsheetID,
  spreadSheetsByUserID,
  spreadSheetsByTemplatesID,
  spreadSheetRowsByUserID,
  templateColumnsByUserID,
  spreadSheetRowsBySpreadSheetID_SoftDelete,
  templateColumnsByTemplatesID_SoftDelete,
  spreadSheetsByTemplatesID_SoftDelete,
  spreadSheetRowsByTemplatesID_SoftDelete,
  spreadSheetRowsByTemplatesID,
  listAppConstants,
} from "../graphql/queries";
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
  updateUser,
  deleteSpreadSheetRows,
  deleteSpreadSheet,
  deleteTemplateColumns,
  deleteUser,
  createCustomerSupport,
} from "../graphql/mutations";
import { DeleteTemplatesInput, DeleteTemplatesMutation } from "../API";
import { GraphQLQuery } from "@aws-amplify/api";
import { Templates } from "../models/index";
import NetInfo from "@react-native-community/netinfo";

export const checkNetwork = () => {
  return new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then((state) => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        resolve(state.isConnected);
      })
      .catch((error) => {
        console.error("Error fetching network status:", error);
        reject(error);
      });
  });
};

// ------------------Auth Section Api start----------------
export const userLogin = async (data: any) => {
  const { youremail, yourpasswaord } = data;
  return new Promise(async (resolve, reject) => {
    try {
      const login = await Auth.signIn(youremail, yourpasswaord);
      resolve(login);
    } catch (e) {
      reject(e);
    }
  });
};

export const userSignup = async (userSignUp: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const signUp = await Auth.signUp(userSignUp);
      resolve(signUp);
    } catch (e) {
      reject(e);
    }
  });
};

export const userExist = async (userName: any, temp_code: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userExist = await Auth.confirmSignUp(userName, temp_code, {
        forceAliasCreation: false,
      });
      resolve(userExist);
    } catch (e) {
      reject(e);
    }
  });
};

export const confirm_Signup = (userName: any, otp: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const confirmSignUp = await Auth.confirmSignUp(userName, otp);
      resolve(confirmSignUp);
    } catch (e) {
      reject(e);
    }
  });
};

export const resend_OTP = (userName: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resendOTP = await Auth.resendSignUp(userName);
      resolve(resendOTP);
    } catch (e) {
      reject(e);
    }
  });
};

export const current_UserInfo = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      checkNetwork().then(async (isConnected) => {
        console.log("network==========", isConnected);
        if (isConnected) {
          const currentUserInfo = await Auth.currentUserInfo();
          console.log("authenticatedIser=========", currentUserInfo);
          resolve(currentUserInfo);
        } else {
          reject({ error: {}, isConnected: isConnected });
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const updateCurrentAuth = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const updateCurrUser = await Auth.updateUserAttributes(user, data);
      let obj = { status: updateCurrUser, detail: user };
      resolve(obj);
    } catch (e) {
      reject(e);
    }
  });
};

// ------------------Template Section Api start----------------

export const create_Template = async (newTemplate: any) => {
  return checkNetwork().then((isConnected) => {
    console.log("networkResp=======", isConnected);
    return new Promise(async (resolve, reject) => {
      try {
        const createTemplate = await API.graphql(
          graphqlOperation(createTemplates, { input: newTemplate })
        );
        resolve(createTemplate);
      } catch (e) {
        reject({ error: e, isConnected: isConnected });
      }
    });
  });
};

export const get_Template_List = async (userId: any) => {
  return checkNetwork().then((isConnected) => {
    console.log("networkResp=======", isConnected);
    return new Promise(async (resolve, reject) => {
      try {
        const filter = {
          soft_Deleted: {
            eq: false,
          },
        };
        const getTemplate = await API.graphql(
          graphqlOperation(templatesByUserID, {
            userID: userId,
            filter: filter,
          })
        );
        resolve(getTemplate);
      } catch (e) {
        reject({ error: e, isConnected: isConnected });
      }
    });
  });
};

export const update_Template = async (newTemplate: any) => {
  return checkNetwork().then((isConnected) => {
    console.log("networkResp=======", isConnected);
    return new Promise(async (resolve, reject) => {
      try {
        const updateTemplate = await API.graphql(
          graphqlOperation(updateTemplates, { input: newTemplate })
        );
        resolve(updateTemplate);
      } catch (e) {
        reject({ error: e, isConnected: isConnected });
      }
    });
  });
};

// ------------------Template Column Section Api start----------------
export const create_Template_Column = async (newTemplateCol: any) => {
  return checkNetwork().then((isConnected) => {
    console.log("networkResp=======", isConnected);
    return new Promise(async (resolve, reject) => {
      try {
        const txnMutation: any = newTemplateCol.map((txn: any, i: any) => {
          const dumStr = `mutation${i}: createTemplateColumns(input: {id: "${txn.id}", column_Name:"${txn.column_Name}", templatesID:"${txn.templatesID}", column_Type:"${txn.column_Type}",column_Index:${txn.column_Index}, soft_Deleted:${txn.soft_Deleted}, userID:"${txn.userID}"}) { id,column_Name,templatesID,column_Type,column_Index,soft_Deleted,userID }`;
          console.log("updateMutation============", dumStr);
          return dumStr;
        });

        const createTemplate = await API.graphql(
          graphqlOperation(`mutation batchMutation {
                ${txnMutation}}`)
        );
        resolve(createTemplate);
      } catch (e) {
        reject({ error: e, isConnected: isConnected });
      }
    });
  });
};

export const get_ColumnByTemplateId = async (templateId: any) => {
  return checkNetwork().then((isConnected) => {
    console.log("networkResp=======", isConnected);
    return new Promise(async (resolve, reject) => {
      try {
        const filter = {
          soft_Deleted: {
            eq: false,
          },
        };
        const getColumn = await API.graphql(
          graphqlOperation(templateColumnsByTemplatesID, {
            templatesID: templateId,
            filter: filter,
          })
        );
        resolve(getColumn);
      } catch (e) {
        reject({ error: e, isConnected: isConnected });
      }
    });
  });
};

export const templateColumn_softDelete = async (updateColumn: any) => {
  return checkNetwork().then((isConnected) => {
    console.log("networkResp=======", isConnected);
    return new Promise(async (resolve, reject) => {
      try {
        const softDeleteTemplateColumn = await API.graphql(
          graphqlOperation(updateTemplateColumns, { input: updateColumn })
        );
        resolve(softDeleteTemplateColumn);
      } catch (e) {
        reject({ error: e, isConnected: isConnected });
      }
    });
  });
};

// ------------------SpreadSheet Section Api start----------------
export const create_SpreadSheet = async (newSpreadSheet: any) => {
  return checkNetwork().then((isConnected) => {
    console.log("networkResp=======", isConnected);
    return new Promise(async (resolve, reject) => {
      try {
        const createSpreadsheet = await API.graphql(
          graphqlOperation(createSpreadSheet, { input: newSpreadSheet })
        );
        resolve(createSpreadsheet);
      } catch (e) {
        reject({ error: e, isConnected: isConnected });
      }
    });
  });
};

export const update_SpreadSheet = async (newSpreadSheet: any) => {
  return checkNetwork().then((isConnected) => {
    console.log("networkResp=======", isConnected);
    return new Promise(async (resolve, reject) => {
      try {
        const updateSpreadsheet = await API.graphql(
          graphqlOperation(updateSpreadSheet, { input: newSpreadSheet })
        );
        resolve(updateSpreadsheet);
      } catch (e) {
        reject({ error: e, isConnected: isConnected });
      }
    });
  });
};

export const get_CloudsheetByUserID = async (userId: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filter = {
        soft_Deleted: {
          eq: false,
        },
      };
      const getCloudsheet = await API.graphql(
        graphqlOperation(spreadSheetsByUserID, {
          userID: userId,
          filter: filter,
        })
      );
      resolve(getCloudsheet);
    } catch (e) {
      reject(e);
    }
  });
};

export const getCloudsheetByTemplateID = async (templateId: any) => {
  return checkNetwork().then((isConnected) => {
    console.log("networkResp=======", isConnected);
    return new Promise(async (resolve, reject) => {
      try {
        const filter = {
          soft_Deleted: {
            eq: false,
          },
        };
        const getCloudsheet = await API.graphql(
          graphqlOperation(spreadSheetsByTemplatesID, {
            templatesID: templateId,
            filter: filter,
          })
        );
        resolve(getCloudsheet);
      } catch (e) {
        reject({ error: e, isConnected: isConnected });
      }
    });
  });
};

export const spreadSheet_softDelete = (softDelete_SpreadSheet: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const softDeleteSpreadSheet = await API.graphql(
        graphqlOperation(updateSpreadSheet, { input: softDelete_SpreadSheet })
      );
      resolve(softDeleteSpreadSheet);
    } catch (e) {
      reject(e);
    }
  });
};
export const softDelete_spreadSheet_and_rows = (spreadSheetRowData: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const txnMutation: any = spreadSheetRowData.map((txn: any, i: any) => {
        const dumStr = `mutation${i}: updateSpreadSheetRows(input: {id: "${txn.id}", soft_Deleted:${txn.soft_Deleted}, _version:${txn._version}}) { id,soft_Deleted,_version }`;
        console.log("updateMutation============", dumStr);
        return dumStr;
      });
      const softDelete_spreadSheetRow = await API.graphql(
        graphqlOperation(`mutation batchMutation {
                ${txnMutation}}`)
      );
      resolve(softDelete_spreadSheetRow);
    } catch (e) {
      reject(e);
    }
  });
};

// ------------------SpreadSheetRow Section Api start----------------
export const create_SpreadSheet_Row = async (newSpreadSheetRow: any) => {
  return checkNetwork().then((isConnected) => {
    console.log("networkResp=======", isConnected);
    return new Promise(async (resolve, reject) => {
      try {
        const createSpreadsheet = await API.graphql(
          graphqlOperation(createSpreadSheetRows, { input: newSpreadSheetRow })
        );
        resolve(createSpreadsheet);
      } catch (e) {
        reject({ error: e, isConnected: isConnected });
      }
    });
  });
};

export const get_SpreadSheetRowBySpreadSheetId = async (spreadSheetId: any) => {
  return checkNetwork().then((isConnected) => {
    console.log("networkResp=======", isConnected);
    return new Promise(async (resolve, reject) => {
      try {
        const filter = {
          soft_Deleted: {
            eq: false,
          },
        };
        const getSpreadsheet = await API.graphql(
          graphqlOperation(spreadSheetRowsBySpreadsheetID, {
            spreadsheetID: spreadSheetId,
            filter: filter,
          })
        );
        resolve(getSpreadsheet);
      } catch (e) {
        reject({ error: e, isConnected: isConnected });
      }
    });
  });
};

export const spreadSheetRow_Count = (spreadSheetId: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filter = {
        soft_Deleted: {
          eq: false,
        },
      };
      const getSpreadsheet = await API.graphql(
        graphqlOperation(spreadSheetRowsBySpreadsheetID, {
          spreadsheetID: spreadSheetId,
          filter: filter,
        })
      );
      resolve(getSpreadsheet);
    } catch (e) {
      reject(e);
    }
  });
};

export const update_SpreadSheetRow = async (updateSpreadSheetRow: any) => {
  return checkNetwork().then((isConnected) => {
    console.log("networkResp=======", isConnected);
    return new Promise(async (resolve, reject) => {
      try {
        const updateSpreadSheetRowData = await API.graphql(
          graphqlOperation(updateSpreadSheetRows, {
            input: updateSpreadSheetRow,
          })
        );
        resolve(updateSpreadSheetRowData);
      } catch (e) {
        reject({ error: e, isConnected: isConnected });
      }
    });
  });
};

export const spreadSheetRow_softDelete = (softDelete_SpreadSheetRow: any) => {
  return checkNetwork().then((isConnected) => {
    console.log("networkResp=======", isConnected);
    return new Promise(async (resolve, reject) => {
      try {
        const softDeleteSpreadSheetRow = await API.graphql(
          graphqlOperation(updateSpreadSheetRows, {
            input: softDelete_SpreadSheetRow,
          })
        );
        resolve(softDeleteSpreadSheetRow);
      } catch (e) {
        reject({ error: e, isConnected: isConnected });
      }
    });
  });
};

export const getSpreadsheetRow_bySpreadsheetId_forSoftDelete = (
  spreadSheetId: any
) => {
  return checkNetwork().then((isConnected) => {
    console.log("networkResp=======", isConnected);
    return new Promise(async (resolve, reject) => {
      try {
        const filter = {
          soft_Deleted: {
            eq: false,
          },
        };
        const getSpreadsheet = await API.graphql(
          graphqlOperation(spreadSheetRowsBySpreadsheetID, {
            spreadsheetID: spreadSheetId,
            filter: filter,
          })
        );
        resolve(getSpreadsheet);
      } catch (e) {
        reject({ error: e, isConnected: isConnected });
      }
    });
  });
};

export const getSpreadSheetRowBy_userId = async () => {
  return checkNetwork().then((isConnected) => {
    console.log("networkResp=======", isConnected);
    return new Promise(async (resolve, reject) => {
      try {
        const filter = {
          soft_Deleted: {
            eq: false,
          },
        };
        const getSpreadsheet = await API.graphql(
          graphqlOperation(spreadSheetRowsByUserID, {
            userID: global.userID,
            filter: filter,
          })
        );
        resolve(getSpreadsheet);
      } catch (e) {
        reject({ error: e, isConnected: isConnected });
      }
    });
  });
};

// ---------------- Soft Delete Template ----------------

export const soft_delete_template = async (template: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filter = {
        soft_Deleted: {
          eq: false,
        },
      };
      console.log("templatedDeleted1===========", template);

      const getSpreadSheet = await API.graphql(
        graphqlOperation(spreadSheetsByTemplatesID, {
          templatesID: template.id,
          filter: filter,
        })
      );

      let spreadSheetList = getSpreadSheet.data.spreadSheetsByTemplatesID.items;

      console.log("spreadsheetList========", spreadSheetList);

      const getSpreadSheetRow = await API.graphql(
        graphqlOperation(spreadSheetRowsByTemplatesID, {
          templatesID: template.id,
          filter: filter,
        })
      );
      const spreadSheetRowList = getSpreadSheetRow.data.spreadSheetRowsByTemplatesID.items;


      // ---------------------------- Delete spreadsheet by templateID -------------------------
      if (spreadSheetList.length > 0) {
        spreadSheetList.forEach((element: any) => {
          element.soft_Deleted = true;
        });
        const txnMutation: any = spreadSheetList.map((txn: any, i: any) => {
          const updateSpreadsheet = `mutation${i}: updateSpreadSheet(input: {id: "${txn.id}", soft_Deleted:${txn.soft_Deleted}, _version:${txn._version} }) { id,soft_Deleted,_version }`;
          console.log("updateMutation============", updateSpreadsheet);
          return updateSpreadsheet;
        });
        const updatedSpreadSheet = await API.graphql(
          graphqlOperation(`mutation batchMutation {
                    ${txnMutation}}`)
        );
        console.log("spreadSheetList======", spreadSheetList);
      }
      // ----------------------------------------------------------------------------------------------

      // ------------------ delete SpreadsheetRow by templateID ------------
      console.log("spreadSheetRowList----------",spreadSheetRowList)
      if (spreadSheetRowList.length > 0) {
        spreadSheetRowList.forEach((element: any) => {
          element.soft_Deleted = true;
        });
        console.log("spreadSheetRowList======", spreadSheetRowList);
        const txnMutation: any = spreadSheetRowList.map((txn: any, i: any) => {
          const updateSpreadsheetRow = `mutation${i}: updateSpreadSheetRows(input: {id: "${txn.id}", soft_Deleted:${txn.soft_Deleted}, _version:${txn._version} }) { id,soft_Deleted,_version }`;
          console.log("updateMutation============", updateSpreadsheetRow);
          return updateSpreadsheetRow;
        });
        const updatedSpreadSheetRow = await API.graphql(
          graphqlOperation(`mutation batchMutation {
              ${txnMutation}}`)
        );
      }

      // --------------------------------------------------------------------------

      const updateTemplate = await API.graphql(
         graphqlOperation(updateTemplates, { input: template })
      );

     
      resolve(updateTemplate);
    } catch (e) {
      reject(e);
    }
  });
};

// ----------- user Table -----------
export const updateUserDetail = (userData: any) => {
  return checkNetwork().then((isConnected) => {
    console.log("networkResp=======", isConnected);
    return new Promise(async (resolve, reject) => {
      try {
        const updateCurrUser = await API.graphql(
          graphqlOperation(updateUser, { input: userData })
        );
        resolve(updateCurrUser);
      } catch (e) {
        reject({ error: e, isConnected: isConnected });
      }
    });
  });
};

export const get_user_from_table = async (userId: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getUserTab = await API.graphql(
        graphqlOperation(getUser, { id: userId })
      );
      resolve(getUserTab);
    } catch (e) {
      reject(e);
    }
  });
};

// ----------- Search SpreadSheet by UserId -----------
export const search_CloudsheetByUserID = async (
  userId: string,
  cloudSheetName: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filter = {
        soft_Deleted: {
          eq: false,
        },
        spreadsheet_name: {
          beginsWith: cloudSheetName,
        },
      };
      const getCloudsheet = await API.graphql(
        graphqlOperation(spreadSheetsByUserID, {
          userID: userId,
          filter: filter,
        })
      );
      resolve(getCloudsheet);
    } catch (e) {
      reject(e);
    }
  });
};

// -------------- Get Location by lat long -------------

export const get_Location_Address = async (
  currentLatitude: any,
  currentLongitude: any
) => {
  console.log("currentPosition==========", currentLatitude, currentLongitude);
  let newLat = parseInt(currentLatitude);
  let newLong = parseInt(currentLongitude);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  // return fetch(`https://api.opencagedata.com/geocode/v1/json?key=${'1f8e7aadef8a4509ab241e33602720b0'}&q=${22.7222948 + 75.8577413}&pretty=1&no_annotations=1`, requestOptions)
  return fetch(
    `https://api.opencagedata.com/geocode/v1/json?key=1f8e7aadef8a4509ab241e33602720b0&q=${newLat}+${newLong}&pretty=1&no_annotations=1`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};

// -------------- Forget Password --------------
export const forgetPassword_sendEmail = async (email: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sendEmail = await Auth.forgotPassword(email);
      resolve(sendEmail);
    } catch (e) {
      reject(e);
    }
  });
};

// ------------ forget password submit ----------
export const forgetPassword_submit = async (
  username: string,
  code: any,
  newPassword: any
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const submitPassword = await Auth.forgotPasswordSubmit(
        username,
        code,
        newPassword
      );
      resolve(submitPassword);
    } catch (e) {
      reject(e);
    }
  });
};

// ------------- search spreadSheetRow by templateId -------------

export const search_Spreadsheet_Row = (Name: string, spreadSheetId: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filter = {
        soft_Deleted: {
          eq: false,
        },
        items: {
          beginsWith: Name,
        },
      };
      const getCloudsheetRow = await API.graphql(
        graphqlOperation(spreadSheetRowsBySpreadsheetID, {
          spreadsheetID: spreadSheetId,
          filter: filter,
        })
      );
      resolve(getCloudsheetRow);
    } catch (e) {
      reject(e);
    }
  });
};

//  ------------------ Delete User Account -------------

export const delete_Account = (userId: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await API.graphql(graphqlOperation(getUser, { id: userId }));

      let templateList = user.data.getUser.Templates.items;
      let spreadSheetList = user.data.getUser.SpreadSheets.items;
      let spreadSheetRowList = user.data.getUser.SpreadSheetRows.items;
      let columnList = user.data.getUser.TemplateColumns.items;

      // const getSpreadSheetRows = await API.graphql(graphqlOperation(spreadSheetRowsByUserID, { userID: userId,filter: filter }))
      // console.log("wants to delete spreadSheetRow====", getSpreadSheetRows)
      // let spreadSheetRowList = getSpreadSheetRows.data.spreadSheetRowsByUserID.items
      if (spreadSheetRowList.length > 0) {
        const txnMutation: any = spreadSheetRowList.map((txn: any, i: any) => {
          const deleteSpreadsheetRow = `mutation${i}: deleteSpreadSheetRows(input: {id: "${txn.id}", _version:${txn._version}}) { id, _version }`;
          console.log("updateMutation============", deleteSpreadsheetRow);
          return deleteSpreadsheetRow;
        });
        const deleteRow = await API.graphql(
          graphqlOperation(`mutation batchMutation {
                    ${txnMutation}}`)
        );
      }

      // const getSpreadSheet = await API.graphql(graphqlOperation(spreadSheetsByUserID, { userID: userId,filter: filter }))
      // console.log("wants to delete spreadSheet====", getSpreadSheet)
      // let spreadSheetList = getSpreadSheet.data.spreadSheetsByUserID.items
      if (spreadSheetList.length > 0) {
        const txnMutation: any = spreadSheetList.map((txn: any, i: any) => {
          const deleteSpreadsheet = `mutation${i}: deleteSpreadSheet(input: {id: "${txn.id}", _version:${txn._version}}) { id, _version }`;
          console.log("updateMutation============", deleteSpreadsheet);
          return deleteSpreadsheet;
        });
        const deleteSpreadsheet = await API.graphql(
          graphqlOperation(`mutation batchMutation {
                    ${txnMutation}}`)
        );
      }
      // const getColumn = await API.graphql(graphqlOperation(templateColumnsByUserID, { userID: userId ,filter: filter}))
      //  console.log("wants to delete column====", getColumn)
      //  let columnList = getColumn.data.templateColumnsByUserID.items
      if (columnList.length > 0) {
        const txnMutation: any = columnList.map((txn: any, i: any) => {
          const deleteColumn = `mutation${i}: deleteTemplateColumns(input: {id: "${txn.id}", _version:${txn._version}}) { id, _version }`;
          console.log("updateMutation============", deleteColumn);
          return deleteColumn;
        });
        const deleteColumn = await API.graphql(
          graphqlOperation(`mutation batchMutation {
                    ${txnMutation}}`)
        );
      }
      // const getTemplate = await API.graphql(graphqlOperation(templatesByUserID, { userID: userId,filter: filter }))
      // console.log("wants to delete template====", getTemplate)
      // let templateList = getTemplate.data.templatesByUserID.items
      if (templateList.length > 0) {
        const txnMutation: any = templateList.map((txn: any, i: any) => {
          const deleteTemplate = `mutation${i}: deleteTemplates(input: {id: "${txn.id}", _version:${txn._version}}) { id, _version }`;
          console.log("updateMutation============", deleteTemplate);
          return deleteTemplate;
        });
        const deleteSpreadsheet = await API.graphql(
          graphqlOperation(`mutation batchMutation {
                    ${txnMutation}}`)
        );
      }

      let detail = {
        id: user.data.getUser.id,
        _version: user.data.getUser._version,
      };

      const deleteUserAccount = await API.graphql(
        graphqlOperation(deleteUser, { input: detail })
      );

      console.log("userDetail======", user);
      resolve(deleteUserAccount);
    } catch (e) {
      reject(e);
    }
  });
};

// ----------------- Customer Support ----------------
export const customerSupport_form = async (customerSupportForm: any) => {
  return checkNetwork().then((isConnected) => {
    console.log("networkResp=======", isConnected);
    return new Promise(async (resolve, reject) => {
      try {
        const customerSupport = await API.graphql(
          graphqlOperation(createCustomerSupport, {
            input: customerSupportForm,
          })
        );
        resolve(customerSupport);
      } catch (e) {
        reject({ error: e, isConnected: isConnected });
      }
    });
  });
};

// -------------- Get App Constants --------------

export const getAppConstants = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getAppConstants = await API.graphql(
        graphqlOperation(listAppConstants)
      );
      resolve(getAppConstants);
    } catch (e) {
      reject(e);
    }
  });
};
