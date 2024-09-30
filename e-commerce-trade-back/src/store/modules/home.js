import mockRequest from "@/utils/mockRequest";
const state = {
  list: {},
};

const mutations = {
  GETDATA(state, list) {
    state.list = list;
  },
};

const actions = {
  // 发请求获取首页的mock数据
  async getData({ commit }) {
    try {
      const result = await mockRequest.get("/home/list");
      commit("GETDATA", result.data);
    } catch (error) {}
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
