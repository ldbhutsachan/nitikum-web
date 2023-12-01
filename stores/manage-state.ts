import { defineStore } from "pinia";

export const useManageState = defineStore({
  id: "state",
  state: (): any => ({
    departmentList: [],
    branchList:[],
    sectionList:[],
    userTypeList:[],
    userList:[],
    documentTypeList:[]
  }),
  actions: {
    setDeparmentList(data:any){
      this.departmentList = data
    },
    setBranchList(data:any){
      this.branchList = data
    },
    setSectionList(data:any){
      this.sectionList = data
    },
    setUserTypeList(data:any){
      this.userTypeList = data
    },
    setUserList(data:any){
      this.userList = data
    },
    setDocumentTypeList(data:any){
      this.documentTypeList = data
    },
    setPosts(data: any) {
      this.posts = data
    },
  },
});
