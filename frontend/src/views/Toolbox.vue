<template>
  <div class="toolbox">
    <h1 class="title">工具箱</h1>
    <div class="tools-grid">
      <div v-for="tool in tools" :key="tool.path" class="tool-item">
        <router-link :to="tool.path">
          <i :class="tool.icon"></i>
          <span>{{ tool.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const tools = [
  {
    name: 'Git Clone Manager',
    path: '/git-clone-manager',
    icon: 'fas fa-code-branch'
  },
  {
    name: 'Version Checker',
    path: '/get-latest-version',
    icon: 'fas fa-tags'
  },
  {
    name: '宫格切换',
    path: '/grid',
    icon: 'fas fa-th'
  },
  {
    name: '金铲铲',
    path: '/gold-chan-chan',
    icon: 'fas fa-gamepad'
  },
  {
    name: '色值转换',
    path: '/color-convert',
    icon: 'fas fa-palette'
  },
  {
    name: '纸牌游戏',
    path: '/card-game',
    icon: 'fas fa-dice'
  }
];
</script>

<style lang="scss" scoped>
.toolbox {
  min-height: 100vh;
  background-color: #1d1d1d;

  .title {
    text-align: center;
    color: #ffffff;
    margin-bottom: 3rem;
    font-size: 2.5rem;
  }

  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 1rem;

    .tool-item {
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        background-color: #2d2d2d;
        border-radius: 8px;
        text-decoration: none;
        color: #ffffff;
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          background-color: #3d3d3d;
        }

        i {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        span {
          font-size: 1rem;
          text-align: center;
        }
      }
    }
  }
}
</style> 