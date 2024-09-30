import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { anyRoutes, resetRouter, asyncRoutes, constantRoutes } from "@/router";
import router from "@/router";
const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    // 角色信息
    roles: [],
    // 按钮权限的信息
    buttons: [],
    // 用户最终需要展示全部路由
    routes: [],
    testRoutes: [],
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
  // 存储用户信息
  SET_USERINFO: (state, userInfo) => {
    state.name = userInfo.name;
    state.avatar = userInfo.avatar;
    // 用户按钮权限标记
    state.buttons = userInfo.buttons;
    state.testRoutes = userInfo.routes;
    // 角色
    state.roles = userInfo.roles;
  },
  // 最终计算出的异步路由
  SET_RESULT_ASYNC_ROUTES: (state, asyncRoutes) => {
    // 计算出当前用户需要展示所有路由 concat合并数组
    state.routes = constantRoutes.concat(asyncRoutes, anyRoutes);
    // 给路由器添加新的路由
    // resetRouter();
    router.addRoutes(state.routes);
    router.options.routes = state.routes;
  },
};
// 定义一个函数：两个数组进行对比，对比出当前用户到底显示哪些异步路由
const computedAsyncRoutes = (asyncRoutes, routes) => {
  // 过滤出当前用户【超级管理|普通员工】需要展示的异步路由
  return asyncRoutes.filter((item) => {
    if (routes.includes(item.name)) {
      // 递归多级路由
      if (item.children && item.children.length) {
        item.children = computedAsyncRoutes(item.children, routes);
      }
      return true;
    }
  });
};
const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again.");
          }

          const { name, avatar } = data;

          // commit('SET_NAME', name)
          // commit('SET_AVATAR', avatar)
          // 存储的用户全部信息
          commit("SET_USERINFO", data);
          commit(
            "SET_RESULT_ASYNC_ROUTES",
            computedAsyncRoutes(asyncRoutes, data.routes)
          );
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
