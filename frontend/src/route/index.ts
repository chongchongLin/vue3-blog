import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      meta: {
        title: "首页",
        index: 1,
        isHeader: true,
      },
    },
    {
      path: "/articleList",
      name: "articleList",
      component: () =>
        import(/* webpackChunkName: "home" */ "@/views/ArticleList.vue"),
      meta: {
        title: "文章列表页",
        index: 1,
        isHeader: true,
      },
    },
    {
      path: "/articleDetail",
      name: "articleDetail",
      component: () =>
        import(/* webpackChunkName: "home" */ "@/views/ArticleDetail.vue"),
      meta: {
        title: "文章详情页",
        index: 1,
        isHeader: true,
      },
    },
    {
      path: "/gold-chan-chan",
      name: "gold",
      component: () =>
        import(/* webpackChunkName: "gold" */ "@/views/Gold.vue"),
      meta: {
        title: "金铲铲",
        index: 1,
        isHeader: true,
      },
    },
    {
      path: "/wage",
      name: "wage",
      component: () =>
        import(/* webpackChunkName: "wage" */ "@/components/Wage.vue"),
      meta: {
        title: "工资计算器",
        index: 1,
        isHeader: true,
      },
    },
    {
      path: "/monitor",
      name: "monitor",
      component: () =>
        import(/* webpackChunkName: "monitor" */ "@/components/Monitor.vue"),
      meta: {
        index: 1,
        isHeader: true,
      },
    },
    {
      path: "/verify-code",
      name: "verify-code",
      component: () =>
        import(
          /* webpackChunkName: "verify-code" */ "@/components/VerifyCode.vue"
        ),
      meta: {
        index: 1,
        isHeader: true,
      },
    },
    {
      path: "/grid",
      name: "grid",
      component: () =>
        import(/* webpackChunkName: "home" */ "@/components/Grid.vue"),
      meta: {
        index: 1,
        isHeader: true,
      },
    },
    {
      path: "/flex",
      name: "flex",
      component: () =>
        import(/* webpackChunkName: "home" */ "@/components/Flex.vue"),
      meta: {
        index: 1,
        isHeader: true,
      },
    },
    {
      path: "/card-game",
      name: "cardGame",
      component: () =>
        import(/* webpackChunkName: "home" */ "@/views/CardGame.vue"),
      meta: {
        isHeader: true,
        index: 1,
      },
    },
    {
      path: "/git-clone-manager",
      name: "gitCloneManager",
      component: () =>
        import(/* webpackChunkName: "home" */ "@/views/GitCloneManager.vue"),
      meta: {
        isHeader: true,
        index: 1,
      },
    },
    {
      path: "/get-latest-version",
      name: "getLatestVersion",
      component: () =>
        import(/* webpackChunkName: "version" */ "@/views/GetLatestVersion.vue"),
      meta: {
        title: "获取最新版号",
        isHeader: true,
        index: 1,
      },
    },
   
  ],
});
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | 小林玩具库`;
  }
  next();
});
export default router;
  