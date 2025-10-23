import type { LocaleMessage, SupportedLocale } from "@/locales/options"
import { useI18n } from "vue-i18n"

const { t, d, n } = useI18n<[LocaleMessage], SupportedLocale>({})
export { d, n, t }
