<template>
  <div class="nav-container">
    <nav class="navigation">
      <div class="left-nav">
        <router-link to="/" class="nav-item">Home</router-link>
        <!-- <router-link to="/blog" class="nav-item">Blog</router-link> -->
        <router-link to="/toolbox" class="nav-item">Toolbox</router-link>
        <router-link to="/resume" class="nav-item">Resume</router-link>
        <router-link to="/about" class="nav-item">About</router-link>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    return {};
  },
};
</script>

<style lang="scss" scoped>
.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 2rem;
  z-index: 100;

  .navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left-nav {
      display: flex;
      gap: 2rem;
    }

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

    .github-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #ffffff;
      text-decoration: none;
      opacity: 0.8;
      transition: opacity 0.2s;

      &:hover {
        opacity: 1;
      }

      .icon {
        width: 28px;
        height: 28px;
        fill: currentColor;
      }

      span {
        font-size: 14px;
        margin-top: 4px;
      }
    }
  }
}
</style>
