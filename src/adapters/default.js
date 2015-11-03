/* eslint no-console:0 no-unused-expressions:0 */

const warn = (msg = 'You are using a default adapter. Create a new one. ', ...args) => {
  console && console.warn && console.warn.apply(console, [msg].concat(args));
};

export default class DefaultAdapter {
  get instance() {
    warn();
  }

  set locale(locale) {
    //warn('DefaultAdapter#setLocale', locale);
  }

  set translations(translations) {
    //warn('DefaultAdapter#setTranslations', translations);
  }

  translate(key, values) {
    warn(undefined, key, values);
    return key;
  }
}
