import { defineStore } from "pinia";

export const useManageState = defineStore({
  id: "state",
  state: (): any => ({
    departmentList: [],
    branchList:[],
    sectionList:[]
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
    setPosts(data: any) {
      this.posts = data
    },
  },
});
