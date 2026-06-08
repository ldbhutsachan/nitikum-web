export interface LoginModels{
    user: string,
    password: string,
}
export interface LoginResultModels{
    code: string | null,
    detail: string | null,
    data:{
        branchCode: string | null,
        branchName: string | null,
        keyId: string | null,
        userLogin: string | null,
        userName: string | null,
        userType: string | null
    }
}