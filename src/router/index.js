import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect', // @/views/login/auth-redirect
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
  // {
  //   path: '/cmdb',
  //   component: Layout,
  //   // redirect: '/cmdb/acces-center',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'cmdb',
  //   meta: {
  //     title: 'CMDB',
  //     icon: 'cmdb',
  //     roles: ['admin']
  //   },
  //   children: [
  //     {
  //       path: 'classify',
  //       component: () => import('@/views/cmdb/tableClassify/tableManage'),
  //       name: 'CmdbClassify',
  //
  //       meta: {
  //         title: '类型管理',
  //         roles: ['admin'],
  //         icon: 'asset'
  //       }
  //     },
  //     {
  //       path: 'classify/info',
  //       component: () => import('@/views/cmdb/tableClassify/tableInfo'),
  //       name: 'CMDBClassifyInfo',
  //       hidden: true,
  //       meta: {
  //         title: '表数据详情'
  //       }
  //     },
  //     {
  //       path: 'asset',
  //       component: () => import('@/views/cmdb/assetsCenter/assetsCenter'),
  //       name: 'CmdbAsset',
  //       meta: {
  //         title: '资产中心',
  //         icon: 'asset'
  //       }
  //     },
  //     {
  //       path: 'asset/search',
  //       component: () => import('@/views/cmdb/searchCenter/scList'),
  //       name: 'cmdb-device-category',
  //       meta: {
  //         title: '查询中心',
  //         roles: ['admin'],
  //         icon: 'category'
  //       }
  //     },
  //     {
  //       path: 'asset/search/info',
  //       component: () => import('@/views/cmdb/searchCenter/searchInfo'),
  //       name: 'CMDBAssetInfo',
  //       hidden: true,
  //       meta: {
  //         title: '表数据详情'
  //       }
  //     }
  //     // {
  //     //   path: 'detail/:id(\\d+)',
  //     //   component: () => import('@/views/cmdb/Detail'),
  //     //   name: 'CmdbDetail',
  //     //   meta: {title: '设备详情', noCache: true, activeMenu: '/cmdb/asset-list'},
  //     //   hidden: true
  //     // }
  //   ]
  // },
  // {
  //   path: '/permissions',
  //   component: Layout,
  //   alwaysShow: true, // will always show the root menu
  //   name: 'PermissionS',
  //   order: 1,
  //   meta: {
  //     title: '权限管理',
  //     icon: 'lock',
  //     roles: ['admin'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'roless',
  //       component: () => import('@/views/permission/roles/index'),
  //       name: 'RolesPermission',
  //       meta: {
  //         title: '角色管理',
  //         roles: ['admin'], // or you can only set roles in sub nav
  //         icon: 'user-roless'
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/rules/index'),
  //       name: 'DirectivePermissions',
  //       meta: {
  //         title: 'API权限',
  //         roles: ['admin'],
  //         icon: 'roles'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'menus',
  //       component: () => import('@/views/permission/menus/index'),
  //       name: 'MenusPermissions',
  //       meta: {
  //         title: '菜单权限',
  //         roles: ['admin'],
  //         icon: 'menu'
  //       }
  //     }
  //   ]
  // }
  /** when your routing map is too long, you can split it into small modules **/
  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: '/user/personal-center',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'user',
  //   meta: {
  //     title: '用户中心',
  //     icon: 'user',
  //     roles: ['admin'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'personal-center',
  //       component: () => import('@/views/users/personal-center'),
  //       name: 'user-info',
  //       meta: {
  //         title: '个人中心',
  //         roles: ['admin'], // or you can only set roles in sub nav
  //         icon: 'user-center'
  //       }
  //     },
  //     {
  //       path: 'department',
  //       component: () => import('@/views/users/department'),
  //       name: 'department',
  //       meta: {
  //         title: '部门管理',
  //         roles: ['admin'],
  //         icon: 'department'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'user-management',
  //       component: () => import('@/views/users/user-management'),
  //       name: 'user-management',
  //       meta: {
  //         title: '用户管理',
  //         roles: ['admin'],
  //         icon: 'management'
  //       }
  //     }
  //   ]
  // },

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    hidden: true,
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
