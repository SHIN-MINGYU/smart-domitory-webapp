import I18n from "i18n-js";
import * as Localize from "react-native-localize";

import en from "./local/en";
import ko from "./local/ko";
import ch from "./local/ch";
import AsyncStorage from "@react-native-async-storage/async-storage";

const locales = Localize.getLocales();
console.log(locales);

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}
AsyncStorage.getItem("Language", (err, result) => {
  if (result) {
    I18n.locale = result;
  }
});

I18n.fallbacks = true;
I18n.translations = {
  en,
  ko,
  ch,
};

export default I18n;
