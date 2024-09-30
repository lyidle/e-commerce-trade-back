//获取SPU列表数据的接口
import request from "@/utils/request";
// /admin/product/{page}/{limit} get
export const reqSpuList = (page, limit, category3Id) =>
  request({
    url: `/manager/product/${page}/${limit}`,
    method: "get",
    params: { category3Id },
  });

// 获取SPU信息
// /admin/product/getSpuById/{spuId} get
export const reqSpu = (spuId) =>
  request({
    url: `/manager/product/getSpuById/${spuId}`,
    method: "get",
  });

// 获取品牌的信息
// /admin/product/baseTrademark/getTrademarkList get
export const reqTradeMarkList = () =>
  request({
    url: `/manager/product/baseTrademark/getTrademarkList`,
    method: "get",
  });

// 获取图片的接口
// /admin/product/spuImageList/{spuId} get
export const reqSpuImageList = (spuId) =>
  request({
    url: `/manager/product/spuImageList/${spuId}`,
    method: "get",
  });

// 获取平台全部销售属性----整个平台销售属性一共三个I
// /admin/product/baseSaleAttrList get
export const reqBaseSaleAttrList = () =>
  request({
    url: `/manager/product/baseSaleAttrList`,
    method: "get",
  });

// 修改SPUl添加SPU：对于修改或者添加，携带给服务器参数大致一样的，唯一的区别就是携带的参数是否带id
/* 
  /admin/product/saveSpuInfo  post
 /admin/product/updateSpuInfo post
*/

export const reqAddOrUpdateSpu = (spuInfo) => {
  // 携带的参数带有id----修改spu
  if (spuInfo.id) {
    return request({
      url: `/manager/product/updateSpuInfo`,
      method: "post",
      data: spuInfo,
    });
  } else {
    // 携带的参数不带id---添加SPU
    return request({
      url: `/manager/product/saveSpuInfo`,
      method: "post",
      data: spuInfo,
    });
  }
};

//删除SPU
// /admin/product/deleteSpu/{spuId} delete
export const reqDeleteSpu = (spuId) =>
  request({
    url: `/manager/product/deleteSpu/${spuId}`,
    method: "delete",
  });
// /admin/product/spuSaleAttrList/{spuId} get
export const reqSpuSaleAttrList = (spuId) =>
  request({
    url: `/manager/product/spuSaleAttrList/${spuId}`,
    method: "get",
  });
//获取平台属性的数据
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get
export const reqAttrInfoList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/manager/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });
// 添加SKU
// /admin/product/saveSkuInfo post
export const reqAddSku = (skuInfo) =>
  request({
    url: `/manager/product/saveSkuInfo`,
    method: "post",
    data: skuInfo,
  });
// 获取SKU列表数据的接口
// get /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) =>
  request({
    url: `/manager/product/findBySpuId/${spuId}`,
    method: "get",
  });