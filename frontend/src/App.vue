<template>
  <div class="container">
    <!-- 简约的顶部导航 -->
    <div class="nav-container">
      <nav class="navigation">
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/toolbox" class="nav-item">Toolbox</router-link>
        <router-link to="/about" class="nav-item">About</router-link>
      </nav>
    </div>

    <!-- 主要内容区 -->
    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  onMounted,
  toRefs,
  h,
  getCurrentInstance,
  computed,
  ref,
  toRaw,
} from "vue";
import { useRoute} from "vue-router";
import navHeader from "@/components/Header.vue";
import webFooter from "@/components/Footer.vue";
export default {
  components: {
    navHeader,
    webFooter,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      date: [],
      count: 1,
      dateName: [
        { name: "凌晨", start: 1, end: 4 },
        { name: "早上", start: 5, end: 10 },
        { name: "中午", start: 11, end: 12 },
        { name: "下午", start: 13, end: 15 },
        { name: "黄昏", start: 16, end: 18 },
        { name: "晚上", start: 19, end: 21 },
        { name: "深夜", start: 22, end: 0 },
      ],
    });
    onMounted(() => {
      document.dispatchEvent(new Event("render-event"));
      init();
    });
    const init = () => {
      getTime();
      let res = calcul.value;
      console.log(toRaw(res));
    };
    const calcul = computed(() => {
      return state.dateName;
    });
    const getTime = () => {
      let hour = new Date().getHours();
      let timeArr = state.dateName.map((item) => item.start);
      const index = findIndex(0, timeArr.length - 1, timeArr, hour);
      const word = state.dateName[index].name;
      open(word);
    };

    const findIndex = (low, high, arr, val) => {
      let mid = Math.floor((low + high) / 2);
      let midVal = arr[mid];
      if (midVal == val) return mid;
      if (low > high) {
        return low - 1;
      }
      if (midVal > val) {
        high = mid - 1;
        return findIndex(low, high, arr, val);
      } else if (midVal < val) {
        low = mid + 1;
        return findIndex(low, high, arr, val);
      }
    };
    const open = (word: string) => {
      const {
        $notify,
      } = getCurrentInstance().appContext.config.globalProperties;
      $notify({
        title: "友情提示",
        message: h("span", { style: "color: teal" }, `Hey,现在是${word}了`),
        duration:1000
      });
    };
    return {
      route,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" >
body{
  margin: 0;
  padding: 0;
}
.container {
  min-height: 100vh;
  background-color: #1d1d1d;
  color: #ffffff;
}

.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;

  .logo {
    font-size: 1.5rem;
    font-weight: 500;
    color: #ffffff;
  }

  .navigation {
    display: flex;
    gap: 2rem;

    .nav-item {
      color: #ffffff;
      text-decoration: none;
      font-size: 1rem;
      opacity: 0.8;
      transition: opacity 0.2s;
      position: relative;
      padding-bottom: 2px;

      &:hover {
        opacity: 1;
      }

      &.router-link-active {
        opacity: 1;
        &:after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: #ffffff;
        }
      }
    }
  }
}

.content {
  padding-top: 60px; // 为固定导航留出空间
}
</style>
