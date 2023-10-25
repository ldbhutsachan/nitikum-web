import { defineStore } from "pinia";

export const useTestStore = defineStore({
  id: "test",
  state: (): any => ({
    posts: [],
  }),
  actions: {
    setPosts(data: any) {
      this.posts = data
    },
  },
});
