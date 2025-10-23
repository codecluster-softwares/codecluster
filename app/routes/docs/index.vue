<script setup lang="ts">
import type { LocaleMessage, SupportedLocale } from "@/locales"
import { useI18n } from "vue-i18n"

const { t } = useI18n<[LocaleMessage], SupportedLocale>()
</script>

<template>
  <div class="container center">
    {{ t("meta.name") }} ({{ t("meta.code") }}):
    {{ t("hello") }}
  </div>
</template>
