import { createRouter, createWebHistory } from "vue-router";
import PageSessions from "../views/PageSessions.vue";
import PageSessionsSubmitted from "../views/PageSessionsSubmitted.vue";

const routes = [
  {
    path: "/",
    name: "Действия клиентов",
    component: PageSessions,
  },
  {
    path: "/submitted",
    name: "Подтвержденные действия клиентов",
    component: PageSessionsSubmitted,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
