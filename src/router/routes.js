const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/home", component: () => import("src/pages/HomePage.vue") },
      {
        path: "/login",
        component: () => import("pages/Auth/LoginUser.vue"),
      },

      {
        path: "/register",
        component: () => import("pages/Auth/RegisterUser.vue"),
      },
      {
        path: "/profile",
        component: () => import("pages/ProfilePage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("src/pages/Errors/ErrorNotFound.vue"),
  },
];

export default routes;
