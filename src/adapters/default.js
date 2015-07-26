/* eslint no-console:0 no-unused-expressions:0 */

const warn = (msg = 'You are using a default adapter. Create a new one. ', ...args) => {
  console && console.warn && console.warn.apply(console, [msg].concat(args));
};

export default {
  get instance() {
    warn();
  },

  set locale(locale) {
    warn();
  },

  set translations(translations) {
    warn();
  },

  translate(key, values) {
    warn(undefined, key, values);
    return key;
  }
};
