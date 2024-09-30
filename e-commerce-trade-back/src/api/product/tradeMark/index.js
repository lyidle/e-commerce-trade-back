// 品牌管理请求文件
import request from "@/utils/request";
// 把admin 换成manager proxy替换路径了
//获取品牌列表接口
// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) =>
  request.get(`/manager/product/baseTrademark/${page}/${limit}`);

//处理添加品牌
//新增品牌：/admin/product/baseTrademark/save  post  携带两个参数：品牌名称、品牌logo

//修改品牌的
//修改品牌 /admin/product/baseTrademark/update  put  携带三个参数：id、品牌名称、品牌logo

export const reqAddOrUpdateTradeMark = (tradeMark) => {
  // 带了id 就是修改品牌的
  if (tradeMark.id) {
    return request({
      url: `/manager/product/baseTrademark/update`,
      method: "put",
      data: tradeMark,
    });
  } else {
    // 添加品牌
    return request({
      url: `/manager/product/baseTrademark/save`,
      method: "post",
      data: tradeMark,
    });
  }
};

// 删除品牌 /admin/product/baseTrademark/remove/{id} delete params:id
export const reqDeleteTradeMark = (id) =>
  request({
    url: `/manager/product/baseTrademark/remove/${id}`,
    method: "delete",
  });
