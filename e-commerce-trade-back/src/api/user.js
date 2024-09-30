import request from "@/utils/request";
// 把/admin/acl/换成了auth proxy替换路径了
export function login(data) {
  return request({
    url: "/auth/index/login",
    method: "post",
    data,
  });
}

export function getInfo(token) {
  return request({
    url: "/auth/index/info",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return request({
    url: "/auth/index/logout",
    method: "post",
  });
}
