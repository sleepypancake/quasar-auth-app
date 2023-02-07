import { route } from 'quasar/wrappers';
// import { auth } from 'src/boot/firebase';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Router.beforeEach((to, from, next) => {
  //   auth.onAuthStateChanged((userAuth) => {
  //     if (userAuth) {
  //       auth.currentUser?.getIdTokenResult().then(({ claims }) => {
  //         console.log({ claims });

  //         if (claims.user) {
  //           if (to.path !== '/customer')
  //             return next({
  //               path: '/customer',
  //             });
  //         } else if (claims.admin) {
  //           if (to.path !== '/admin')
  //             return next({
  //               path: '/admin',
  //             });
  //         } else if (claims.driver) {
  //           if (to.path !== '/driver')
  //             return next({
  //               path: '/driver',
  //             });
  //         }
  //       });
  //     } else {
  //       if (to.matched.some((record) => record.meta.auth)) {
  //         next({
  //           path: '/login',
  //           query: {
  //             redirect: to.fullPath,
  //           },
  //         });
  //       } else {
  //         next();
  //       }
  //     }
  //   });

  //   next();
  // });

  return Router;
});
