import { defineStore } from "pinia";

export const useManageState = defineStore({
  id: "state",
  state: (): any => ({
    departmentList: [],
    branchList:[],
    sectionList:[],
    userTypeList:[]
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
    setPosts(data: any) {
      this.posts = data
    },
  },
});
