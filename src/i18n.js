import {EventEmitter} from 'events';
import DefaultAdapter from './adapters/default';
import decorator from './decorator';

export const CHANGE_TRANSLATION_EVENT = 'translations';

export default class Rosetta extends EventEmitter {
  constructor({adapter = new DefaultAdapter()} = {}) {
    super();
    this.translator = adapter;
    this.translations = {};
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

  get locale() {
    return this.translator.locale;
  }

  t(key, values) {
    return this.translator.translate(key, values);
  }

  addToContext(Component){
    return decorator(this)(Component);
  }

}
