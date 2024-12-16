<template>
  <div class="footer-container">
    <a href="https://beian.miit.gov.cn">浙ICP备2024140233号-1</a>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
@use "@/common/mixin.scss" as *;
.footer-container {
  @include wh(100%, 20px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  a {
    text-decoration: none;
    color: #999;
  }
}
</style>