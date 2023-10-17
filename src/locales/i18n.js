import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'

import { enUS } from './en-us'
import { zhTW } from './zh-tw'

const locale = Localization.locale

const i18n = new I18n({
  'en-US': enUS,
  'zh-TW': zhTW,
})

i18n.defaultLocale = locale
i18n.locale = 'zh-TW'

export default i18n
