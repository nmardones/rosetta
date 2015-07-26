import Polyglot from 'node-polyglot';

const polyglot = new Polyglot();

export default {
  get instance() {
    return polyglot;
  },

  set locale(locale) {
    return polyglot.locale(locale);
  },

  get locale() {
    return polyglot.locale();
  },

  set translations(translations) {
    polyglot.extend(translations);
  },

  translate(key, values) {
    return polyglot.t(key, values);
  }
};
