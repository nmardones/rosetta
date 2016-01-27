import {EventEmitter} from 'events';
import DefaultAdapter from './adapters/default';
import * as decorator from './decorator';
import slugify from 'underscore.string/slugify';

export const CHANGE_TRANSLATION_EVENT = 'translations';

export default class Rosetta extends EventEmitter {
  constructor({adapter = new DefaultAdapter()} = {}) {
    super();
    this.translator = adapter;
    this._culture = null;
    this._languages = null;
  }

  set adapter(adapter) {
    this.translator = adapter;
  }

  get adapter() {
    return this.translator;
  }

  set culture(culture) {
    this._culture = culture;
    this.translator.locale = culture.split('-')[0];
    this.translator.translations = this._languages[culture];
  }

  get culture() {
    return this._culture;
  }

  get locale() {
    return this.translator.locale;
  }

  set languages(languages) {
    this._languages = languages;
  }

  t(key, values) {
    return this.translator.translate(key, values);
  }

  url(urlPattern) {
    return urlPattern.split('/').map((token) => {
      return slugify(this.t(token));
    }).join('/');
  }

  addToContext(Component, languages){
    return decorator.rosetta(this, languages)(Component);
  }
}
