import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../plugins/firebase";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/Default"),
    meta: {
      requeiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "/perfil",
        name: "Perfil",
        component: () =>
          import(/* webpackChunkName: "perfil" */ "../views/Perfil.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/Blank"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/Login.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requeiresAuth = to.matched.some((x => x.meta.requeiresAuth));

  if (requeiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
