export default [
  {
    path: "buisness",
    name: "buisness-sales",
    redirect: { name: "sales" },
    children: [
      {
        path: "sales",
        name: "sales",
        component: () => import("src/pages/Authorized/sales/IndexPage.vue"),
      },
    ],
  },
];
