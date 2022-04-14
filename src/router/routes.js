const routes = [
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/MainPage.vue"),
  },
];

export default routes;
