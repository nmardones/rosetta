import React from 'react';
import i18n, {CHANGE_TRANSLATION_EVENT} from './';

export const rosetta = (Target) => {
  return class Rosetta extends Target {
    constructor() {
      super();
      i18n.on(CHANGE_TRANSLATION_EVENT, () => {
        this.forceUpdate();
      });
    }
  }
};
