<template>
  <div class="container">
    <div
      class="item"
      v-for="item in routeList"
      :key="item.id"
      @click="showComponent(item.path)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "home",
  setup() {
    const router = useRouter();
    const state = reactive({
      routeList: [
        {
          path: "/grid",
          name: "宫格切换",
          id: 0,
        },
        {
          path: "/gold-chan-chan",
          name: "金铲铲",
          id: 1,
        },
        {
          path: "/color-convert",
          name: "色值转换",
          id: 2,
        },
        {
          path: "/card-game",
          name: "纸牌游戏",
          id: 3,
        },
        {
          path:"/git-clone-manager",
          name:"Git克隆管理",
          id:4,
        },
        {
          path: "/get-latest-version",
          name: "获取最新版号",
          id: 5,
        },
      ],
    });
    const showComponent = (pathCtn) => {
      router.push({ path: `${pathCtn}` });
    };
    return {
      ...toRefs(state),
      showComponent,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(5, 18%);
  grid-template-rows: repeat(5, 20%);
  grid-gap: 20px 20px;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 12px;
    position: relative;
    z-index: 1;
  }
  .item::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(10px) contrast(0.8);
    z-index: -1;
    background-image: url("../assets/imgs/re0.png");
  }
}
</style>
