import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify';
import { listUsers, getUser, templatesByUserID } from '../graphql/queries';
import { createTemplates, updateTemplates, deleteTemplates } from '../graphql/mutations';

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
            const createTemplate = await API.graphql(graphqlOperation(templatesByUserID, { userID: userId}))
            resolve(createTemplate);
        } catch (e) {
            reject(e);
        }
    })
}

export const update_Template = async (newTemplate:any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateTemplate = await API.graphql(graphqlOperation(updateTemplates, { input: newTemplate}))
            resolve(updateTemplate);
        } catch (e) {
            reject(e);
        }
    })
}

export const delete_Template = async(newTemplate:any)=>{
    return new Promise(async (resolve, reject) => {
        try {
            const deleteTemplate = await API.graphql(graphqlOperation(deleteTemplates, { input: newTemplate}))
            resolve(deleteTemplate);
        } catch (e) {
            reject(e);
        }
    })
}