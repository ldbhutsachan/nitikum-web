export interface BranchModel {
    message: {
        resMgs: string | null,
        resCode: string | null
    },
    resData: [
        {
            branchCode: string | null,
            brName: string | null,
            brNameLa: string | null,
            location: string | null,
            brType: string | null,
            underBr: string | null,
            id: string | null
        }
    ]

}