<script setup lang="ts">
import { t } from "@/locales"
</script>

<template>
  <div class="container center">
    {{ t("current_language_name") }} ({{ t("current_language_code") }}):
    {{ t("hello") }}
  </div>
</template>
