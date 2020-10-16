// @ts-nocheck
import { ApplyPluginsType, dynamic } from '/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/xadmin/login",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/layouts/UserLayout'), loading: require('@/components/PageLoading/index').default}),
    "routes": [
      {
        "name": "login",
        "path": "/xadmin/login",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TyAdminBuiltIn__UserLogin' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/pages/TyAdminBuiltIn/UserLogin'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      }
    ]
  },
  {
    "path": "/xadmin/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/layouts/SecurityLayout'), loading: require('@/components/PageLoading/index').default}),
    "routes": [
      {
        "path": "/xadmin/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/layouts/BasicLayout'), loading: require('@/components/PageLoading/index').default}),
        "authority": [
          "admin",
          "user"
        ],
        "routes": [
          {
            "name": "首页",
            "path": "/xadmin/index",
            "icon": "dashboard",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TyAdminBuiltIn__DashBoard' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/pages/TyAdminBuiltIn/DashBoard'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "path": "/xadmin/",
            "redirect": "/xadmin/index",
            "exact": true
          },
          {
            "name": "首页",
            "path": "/xadmin/index",
            "icon": "dashboard",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TyAdminBuiltIn__DashBoard' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/pages/TyAdminBuiltIn/DashBoard'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "ty admin menu config",
            "icon": "smile",
            "path": "/xadmin/ty_admin_menu_config",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__TyAdminMenuConfigList' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/pages/AutoGenPage/TyAdminMenuConfigList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "模型配置",
            "icon": "smile",
            "path": "/xadmin/ty_admin_model_config",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__TyAdminModelConfigList' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/pages/AutoGenPage/TyAdminModelConfigList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "字段配置",
            "icon": "smile",
            "path": "/xadmin/ty_admin_model_field",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__TyAdminModelFieldList' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/pages/AutoGenPage/TyAdminModelFieldList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "办公区",
            "icon": "smile",
            "path": "/xadmin/bgq_info",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__BgqInfoList' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/pages/AutoGenPage/BgqInfoList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "自动发现",
            "icon": "smile",
            "path": "/xadmin/auto_discovery",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__AutoDiscoveryList' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/pages/AutoGenPage/AutoDiscoveryList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "historical 设备资产",
            "icon": "smile",
            "path": "/xadmin/historical_network_device",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__HistoricalNetworkDeviceList' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/pages/AutoGenPage/HistoricalNetworkDeviceList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "设备资产",
            "icon": "smile",
            "path": "/xadmin/network_device",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__NetworkDeviceList' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/pages/AutoGenPage/NetworkDeviceList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "用户信息",
            "icon": "smile",
            "path": "/xadmin/user_info",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__UserInfoList' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/pages/AutoGenPage/UserInfoList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "Tyadmin内置",
            "icon": "VideoCamera",
            "path": "/xadmin/sys",
            "routes": [
              {
                "name": "TyAdmin日志",
                "icon": "smile",
                "path": "/xadmin/sys/ty_admin_sys_log",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TyAdminBuiltIn__TyAdminSysLogList' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/pages/TyAdminBuiltIn/TyAdminSysLogList'), loading: require('@/components/PageLoading/index').default}),
                "exact": true
              },
              {
                "name": "TyAdmin验证",
                "icon": "smile",
                "path": "/xadmin/sys/ty_admin_email_verify_record",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TyAdminBuiltIn__TyAdminEmailVerifyRecordList' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/pages/TyAdminBuiltIn/TyAdminEmailVerifyRecordList'), loading: require('@/components/PageLoading/index').default}),
                "exact": true
              }
            ]
          },
          {
            "name": "Tyadmin内置",
            "icon": "VideoCamera",
            "path": "/xadmin/sys",
            "routes": [
              {
                "name": "TyAdmin日志",
                "icon": "VideoCamera",
                "path": "/xadmin/sys/ty_admin_sys_log",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TyAdminBuiltIn__TyAdminSysLogList' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/pages/TyAdminBuiltIn/TyAdminSysLogList'), loading: require('@/components/PageLoading/index').default}),
                "exact": true
              },
              {
                "name": "TyAdmin验证",
                "icon": "VideoCamera",
                "path": "/xadmin/sys/ty_admin_email_verify_record",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TyAdminBuiltIn__TyAdminEmailVerifyRecordList' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/pages/TyAdminBuiltIn/TyAdminEmailVerifyRecordList'), loading: require('@/components/PageLoading/index').default}),
                "exact": true
              }
            ]
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/pages/404'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/pages/404'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/mtianyan/tyRepos/Python/cookiecutter-tyadmin-demo/TyadminDemo/tyadmin/src/pages/404'), loading: require('@/components/PageLoading/index').default}),
    "exact": true
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
