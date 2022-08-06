import buisness from "./Authorized/buisness/index";

const routes = [
  {
    path: "/",
    redirect: { name: "sales" },
    component: () => import("layouts/MainLayout.vue"),
    children: [...buisness],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
