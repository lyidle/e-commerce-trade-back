import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 常量路由：就是不关用户是什么角色，都可以看见的路由
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/index",
    redirect: "/dashboard",
  },
];
// 异步路由:不同的用户（角色），需要过滤筛选出的路由，称之为异步路由
export const asyncRoutes = [
  {
    path: "/product",
    component: Layout,
    name: "Product",
    meta: { title: "商品管理", icon: "el-icon-goods" },
    children: [
      {
        path: "trademark",
        name: "tradeMark",
        component: () => import("@/views/product/tradeMark"),
        meta: { title: "品牌管理" },
      },
      {
        path: "attr",
        name: "Attr",
        component: () => import("@/views/product/Attr"),
        meta: { title: "平台属性管理" },
      },
      {
        path: "spu",
        name: "Spu",
        component: () => import("@/views/product/Spu"),
        meta: { title: "Spu管理" },
      },
      {
        path: "sku",
        name: "Sku",
        component: () => import("@/views/product/Sku"),
        meta: { title: "Sku管理" },
      },
    ],
  },
  {
    name: "Acl",
    path: "/acl",
    component: Layout,
    redirect: "/acl/user/list",
    meta: {
      title: "权限管理",
      icon: "el-icon-lock",
    },
    children: [
      {
        name: "User",
        path: "user/list",
        component: () => import("@/views/acl/user/list"),
        meta: {
          title: "用户管理",
        },
      },
      {
        name: "Role",
        path: "role/list",
        component: () => import("@/views/acl/role/list"),
        meta: {
          title: "角色管理",
        },
      },
      {
        name: "RoleAuth",
        path: "role/auth/:id",
        component: () => import("@/views/acl/role/roleAuth"),
        meta: {
          activeMenu: "/acl/role/list",
          title: "角色授权",
        },
        hidden: true,
      },
      {
        name: "Permission",
        path: "permission/list",
        component: () => import("@/views/acl/permission/list"),
        meta: {
          title: "菜单管理",
        },
      },
    ],
  },
  {
    path: "/test",
    component: Layout,
    name: "Test",
    meta: { title: "Test", icon: "el-icon-info" },
    children: [
      {
        path: "/Test1",
        name: "Test1",
        component: () => import("@/views/Test"),
        meta: { title: "TestAdd", icon: "el-icon-warning" },
        children: [
          {
            path: "/testAdd1",
            name: "TestAdd1",
            component: () => import("@/views/Test/Test1/TestAdd1"),
            meta: { title: "TestAdd1", icon: "el-icon-folder-add" },
          },
          {
            path: "/testAdd2",
            name: "TestAdd2",
            component: () => import("@/views/Test/Test1/TestAdd2"),
            meta: { title: "TestAdd2", icon: "el-icon-folder-add" },
          },
          {
            path: "/testAdd3",
            name: "TestAdd3",
            component: () => import("@/views/Test/Test1/TestAdd3"),
            meta: { title: "TestAdd3", icon: "el-icon-folder-add" },
          },
        ],
      },
      {
        path: "/Test2",
        name: "Test2",
        component: () => import("@/views/Test"),
        meta: { title: "TestRemove", icon: "el-icon-warning-outline" },
        children: [
          {
            path: "/testRemove1",
            name: "TestRemove1",
            component: () => import("@/views/Test/Test2/TestRemove1"),
            meta: { title: "TestRemove1", icon: "el-icon-folder-remove" },
          },
          {
            path: "/testRemove2",
            name: "TestRemove2",
            component: () => import("@/views/Test/Test2/TestRemove2"),
            meta: { title: "TestRemove2", icon: "el-icon-folder-remove" },
          },
        ],
      },
      {
        path: "/Test3",
        name: "Test3",
        component: () => import("@/views/Test/Test3/TestDelete"),
        meta: { title: "TestDelete", icon: "el-icon-question" },
      },
    ],
  },
];

//任意路由：当路径出现错误的时候重定向404
// 404 page must be placed at the end !!!
export const anyRoutes = { path: "*", redirect: "/404", hidden: true };

const createRouter = () =>
  new Router({
    mode: "history", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
