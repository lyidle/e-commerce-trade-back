//获取SPU列表数据的接口
import request from "@/utils/request";
// get /admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) =>
  request({
    url: `/manager/product/list/${page}/${limit}`,
    method: "get",
  });
// 上架
// get /admin/product/onSale/{skuId}
export const reqSale = (skuId) =>
  request({
    url: `/manager/product/onSale/${skuId}`,
    method: "get",
  });
// 下架
// get /admin/product/cancelSale/{skuId}
export const reqCancel = (skuId) =>
  request({
    url: `/manager/product/cancelSale/${skuId}`,
    method: "get",
  });
// 获取SKU详情的接口
// get /admin/product/getSkuById/{skuId}
export const reqSkuById = (skuId) =>
  request({
    url: `/manager/product/getSkuById/${skuId}`,
    method: "get",
  });
