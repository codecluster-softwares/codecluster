import { createI18n } from "vue-i18n"

/**
 * List of all locales in "@/locales".
 * TS cannot support type on dynamic keys (such as from import.meta.glob),
 * so we need to update such imports manually.
 */
const messages = {
  en: await import("@/locales/messages/en.json"),
  zh: await import("@/locales/messages/zh.json"),
} as const

export type SupportedLocale = keyof typeof messages
export type LocaleMessage = typeof messages.en
export default createI18n<[LocaleMessage], SupportedLocale>({
  legacy: false,
  locale: "en",
  messages,
})
