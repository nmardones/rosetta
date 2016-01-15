import {EventEmitter} from 'events';
import DefaultAdapter from './adapters/default';
import {warn} from './console';
import * as decorator from './decorator';

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
    this.translator.translations = this._languages[culture];
  }

  get culture() {
    return this._culture;
  }

  set languages(languages) {
    this._languages = languages;
  }

  set translations (dicc) {
    warn('Rosetta#translations DEPRECATED');
    this.translator.translations = dicc;
    this.emit(CHANGE_TRANSLATION_EVENT, dicc);
  }

  setTranslationsSilent(dicc, culture){
    warn('Rosetta#setTranslationsSilent DEPRECATED');
    this._culture = culture;
    this.translator.translations = dicc;
  }

  get locale() {
    warn('Rosetta#locale DEPRECATED');
    return this.translator.locale;
  }

  t(key, values) {
    return this.translator.translate(key, values);
  }

  url(urlPattern) {
    return urlPattern.split('/').map((token) => {
      return this.t(token).toLowerCase();
    }).join('/');
  }

  addToContext(Component, languages){
    return decorator.rosetta(this, languages)(Component);
  }

}
