export default [
  {
    path: '/login',
    name: LOGIN_ROUTE_NAME,
    component: () => import('@/views/Auth/LoginView.vue'),
    hideInMenu: true,
    meta: {
      layout: 'AuthLayout',
    },
  },
  // {
  //   path: '/forgot-password',
  //   name: FORGOT_PASSWORD_ROUTE_NAME,
  //   component: () => import('@/views/Auth/PasswordForgotView'),
  //   hideInMenu: true,
  //   meta: {
  //     layout: 'AuthLayout',
  //   },
  // },
  // {
  //   path: '/reset-password',
  //   name: RESET_PASSWORD_ROUTE_NAME,
  //   component: () => import('@/views/Auth/PasswordResetView'),
  //   hideInMenu: true,
  //   meta: {
  //     layout: 'AuthLayout',
  //   },
  // },
  // {
  //   path: '/profile',
  //   name: PROFILE_ROUTE_NAME,
  //   component: () => import('@/views/Auth/ProfileView'),
  //   hideInMenu: true,
  //   meta: {
  //     title: 'Trang cá nhân',
  //   },
  // },
];
