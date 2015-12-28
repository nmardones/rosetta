import {EventEmitter} from 'events';
import DefaultAdapter from './adapters/default';
import * as decorator from './decorator';

export const CHANGE_TRANSLATION_EVENT = 'translations';

export default class Rosetta extends EventEmitter {
  constructor({adapter = new DefaultAdapter()} = {}) {
    super();
    this.translator = adapter;
  }

  set adapter(adapter) {
    this.translator = adapter;
  }

  get adapter() {
    return this.translator;
  }

  set translations (dicc) {
    this.translator.translations = dicc;
    this.emit(CHANGE_TRANSLATION_EVENT, dicc);
  }

  setTranslationsSilent(dicc){
    this.translator.translations = dicc;
  }

  get locale() {
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
