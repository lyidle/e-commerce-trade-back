// 平台属性管理管理请求文件
import request from "@/utils/request";
// 获取一级分类数据接口
// /admin/product/getCategory1 get
export const reqCategory1List = () =>
  request({ url: "/manager/product/getCategory1", method: "get" });

// 获取二级分类数据接口
// /admin/product/getCategory2/{category1Id} get
export const reqCategory2List = (category1Id) =>
  request({
    url: `/manager/product/getCategory2/${category1Id}`,
    method: "get",
  });

// 获取三级分类数据接口
// /admin/product/getCategory3/{category2Id} get
export const reqCategory3List = (category2Id) =>
  request({
    url: `/manager/product/getCategory3/${category2Id}`,
    method: "get",
  });

// /获取平台属性接口
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get

export const reqAttrList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/manager/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });

//添加属性与属性值接口
// /admin/product/saveAttrInfo post
export const reqAddOrUpdateAttr = (data) =>
  request({
    url: `/manager/product/saveAttrInfo`,
    method: "post",
    data,
  });

// 删除属性
// /admin/product/deleteAttr/{attrId} delete
export const reqDeleteAttrList = (attrId) =>
  request({
    url: `/manager/product/deleteAttr/${attrId}`,
    method: "delete",
  });
