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
      name: "home",
      component: () => import("@/views/Home.vue"),
      meta: {
        title: "首页"
      }
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("@/views/BlogList.vue"),
      meta: {
        title: "博客"
      }
    },
    {
      path: "/blog/:id",
      name: "blogDetail",
      component: () => import("@/views/BlogDetail.vue"),
      meta: {
        title: "文章详情"
      }
    },
    {
      path: "/toolbox",
      name: "toolbox",
      component: () => import("@/views/Toolbox.vue"),
      meta: {
        title: "工具箱"
      }
    },
    {
      path: "/git-clone-manager",
      name: "gitCloneManager",
      component: () => import("@/views/GitCloneManager.vue"),
      meta: {
        title: "Git克隆管理"
      }
    },
    {
      path: "/get-latest-version",
      name: "getLatestVersion",
      component: () => import("@/views/GetLatestVersion.vue"),
      meta: {
        title: "获取最新版号"
      }
    },
    {
      path: "/grid",
      name: "grid",
      component: () => import("@/components/Grid.vue"),
      meta: {
        title: "宫格切换"
      }
    },
    {
      path: "/gold-chan-chan",
      name: "gold",
      component: () => import("@/views/Gold.vue"),
      meta: {
        title: "金铲铲"
      }
    },
    {
      path: "/card-game",
      name: "cardGame",
      component: () => import("@/views/CardGame.vue"),
      meta: {
        title: "纸牌游戏"
      }
    },
    {
      path: "/upload",
      name: "upload",
      component: () => import("@/components/Upload.vue"),
      meta: {
        title: "图片上传"
      }
    },
    {
      path: "/resume",
      name: "resume",
      component: () => import("@/views/Resume.vue"),
      meta: {
        title: "简历"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | 小林玩具库`;
  }
  next();
});

export default router;
  