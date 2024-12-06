<template>
  <button @click="sub">发起</button>
</template>

<script setup>
import axios from "axios";
import BigNumber from "bignumber.js";
import { ref, onMounted } from "vue";



onMounted(() => {
  let x = new BigNumber(0.1);
  let y = x.plus(0.2);
  console.log('y',y.toString())
  console.log(0.1+0.2)
  
});
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
  display: block;
  flex-shrink: 0;
}
</style>
