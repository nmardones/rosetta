import {EventEmitter} from 'events';
import defaultAdapter from './adapters/default';

export const CHANGE_TRANSLATION_EVENT = 'translations';

// Singleton instance
export default new class extends EventEmitter {
  constructor() {
    super();
    this.i18n = defaultAdapter;
  }

  set adapter(adapter) {
    this.i18n = adapter;
  }

  get adapter() {
    return this.i18n;
  }

  set translations (dicc) {
    this.i18n.translations = dicc;
    this.emit(CHANGE_TRANSLATION_EVENT, dicc);
  }

  t(key, values) {
    return this.i18n.translate(key, values);
  }

}();
