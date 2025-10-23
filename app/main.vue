<script setup lang="ts">
import "@/common.scss"
import { onMounted } from "vue"
import { RouterView } from "vue-router"

onMounted(() => (document.title = "Code Cluster"))
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
body {
  height: 100vh;
  margin: 0;
  overflow: hidden;
  user-select: none;

  font-family: sans-serif;

  div#app {
    position: relative;
    height: 100%;
    width: 100%;
  }
}
</style>
