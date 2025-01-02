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
  // {
  //   name: '宫格切换',
  //   path: '/grid',
  //   icon: 'fas fa-th'
  // },
  // {
  //   name: '金铲铲',
  //   path: '/gold-chan-chan',
  //   icon: 'fas fa-gamepad'
  // },
  // {
  //   name: '色值转换',
  //   path: '/color-convert',
  //   icon: 'fas fa-palette'
  // },
  // {
  //   name: '纸牌游戏',
  //   path: '/card-game',
  //   icon: 'fas fa-dice'
  // },
  {
    name: '图片上传',
    path: '/upload',
    icon: 'fas fa-upload'
  }
];
</script>

<style lang="scss" scoped>
.toolbox {
  padding: 2rem;
  min-height: calc(100vh - 80px);
  background-color: #1d1d1d;

  .title {
    text-align: center;
    color: #ffffff;
    margin-bottom: 3rem;
    font-size: 2.5rem;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;

    .tool-item {
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        background: linear-gradient(145deg, #2a2a2a, #333333);
        border-radius: 12px;
        text-decoration: none;
        color: #ffffff;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.1);

        &:hover {
          transform: translateY(-5px);
          background: linear-gradient(145deg, #333333, #3a3a3a);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 255, 255, 0.2);

          i {
            color: #4a9eff;
            transform: scale(1.1);
          }

          span {
            color: #4a9eff;
          }
        }

        i {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
          color: rgba(255, 255, 255, 0.9);
        }

        span {
          font-size: 1.1rem;
          text-align: center;
          font-weight: 500;
          transition: color 0.3s ease;
          color: rgba(255, 255, 255, 0.9);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .toolbox {
    padding: 1rem;

    .title {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    .tools-grid {
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 1rem;

      .tool-item {
        a {
          padding: 1.5rem;

          i {
            font-size: 2rem;
            margin-bottom: 1rem;
          }

          span {
            font-size: 1rem;
          }
        }
      }
    }
  }
}
</style> 