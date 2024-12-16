<template>
  <div class="home">

    <main class="main">
      <div class="profile">
        <div class="avatar">
          <img src="@/assets/imgs/avatar.png" alt="avatar" class="avatar-img">
        </div>
        <h1 class="name">Waiter Lin</h1>
        <h2 class="title">Coder</h2>
        <h3 class="subtitle">Frontend Developer</h3>
        <p class="description">Welcome to my site.</p>
        
        <div class="social-links">
          <a href="https://github.com/chongchongLin" target="_blank">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://juejin.cn/user/729731452385719" target="_blank">
            <i class="fas fa-book"></i>
          </a>
          <a href="waiterlin9898@gmail.com">
            <i class="fas fa-envelope"></i>
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background-color: #1d1d1d;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell;
}

.header {
  padding: 2rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .nav {
    a {
      color: #ffffff;
      text-decoration: none;
      margin-left: 2rem;
      font-size: 1rem;
      opacity: 0.8;
      transition: opacity 0.3s;

      &:hover {
        opacity: 1;
      }
    }
  }
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);

  .profile {
    text-align: center;

    .avatar {
      width: 200px;
      height: 200px;
      margin: 0 auto 2rem;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid #ffffff;
      .avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .name {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .title {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      font-weight: normal;
    }

    .subtitle {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      font-weight: normal;
    }

    .description {
      font-size: 1rem;
      opacity: 0.8;
      margin-bottom: 2rem;
    }

    .social-links {
      a {
        color: #ffffff;
        font-size: 1.5rem;
        margin: 0 1rem;
        opacity: 0.8;
        transition: opacity 0.3s;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
