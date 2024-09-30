// 统一引入接口
import * as tradeMark from "@/api/product/tradeMark";
import * as attr from "@/api/product/attr";
import * as spu from "@/api/product/spu";
import * as sku from "@/api/product/sku";
// 权限管理
import permission from "@/api/acl/permission";
import role from "@/api/acl/role";
import * as user from "@/api/acl/user";
// 暴露
export default {
  tradeMark,
  attr,
  spu,
  sku,
  // 权限管理
  permission,
  role,
  user,
};
