/* eslint no-console:0 no-unused-expressions:0 */

const warn = (msg = 'You are using a default adapter. Create a new one. ', ...args) => {
  console && console.warn && console.warn.apply(console, [msg].concat(args));
};

export default class DefaultAdapter {
  constructor(){
    this._keys = [];
  }

  get instance() {
    warn();
  }

  set locale(locale) {
    //warn('DefaultAdapter#setLocale', locale);
  }

  set translations(translations) {
    //warn('DefaultAdapter#setTranslations', translations);
  }

  get dictionary(){
    warn('Literals dictionary', JSON.stringify(this._keys));
    return this._keys;
  }

  translate(key, values) {
    warn(undefined, key, values);
    this._keys.push({ [ key ]: '' });
    return key;
  }
}
