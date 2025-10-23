<script setup lang="ts">
import { computed } from "vue"
import { RouterLink, useRoute } from "vue-router"

const route = useRoute()

const title = computed(() => (route.query.title as string) || "Error")
const message = computed(
  () => (route.query.message as string) || "Unknown error occurred",
)
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <RouterLink to="/">Back to Home</RouterLink>
  </div>
</template>
