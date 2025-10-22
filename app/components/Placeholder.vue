<template>
  <div :class="[$style.container, $style.center]">
    <slot />
  </div>
</template>

<style module lang="scss">
.container {
  position: relative;
  height: 100%;
  width: 100%;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
