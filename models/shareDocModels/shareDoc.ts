export interface ShareDocument {
    message: {
        resMgs: string | null,
        resCode: string | null
    },
    resData: [
        {
            id: string | null,
            docNo: string | null,
            docType: string | null,
            subjectName: string | null,
            related: string | null,
            docStatus: string | null,
            docPath: string | null,
            createDate: string | null,
            markerId: string | null,
            approveId: string | null,
            deleteId: string | null,
            sharingType: string | null,
            docPathLa: string | null,
            docDate: string | null,
            approveDate: string | null,
            depDescEN: string | null,
            depDescLAO: string | null,
            userName: string | null,
            userNameApprove: string | null,
            userNameUpdate: string | null,
            docDescEn: string | null,
            docDescLao: string | null,
            createBy: string | null
        }
    ]

}