import React from 'react';
import {CHANGE_TRANSLATION_EVENT} from './';

export const rosetta = (i18n) => {
  return (Target) => {

    // Prevent context varaibles
    // https://github.com/rackt/react-router/issues/484#issuecomment-131066254
    class Rosetta extends Target {

      static get childContextTypes(){
        return Object.assign({}, super.childContextTypes, {
          i18n: React.PropTypes.object
        });
      }

      constructor(...args) {
        super(...args);
        i18n.on(CHANGE_TRANSLATION_EVENT, () => {
          this.forceUpdate();
        });
        this.i18n = i18n;
      }

      getChildContext() {
        return Object.assign({}, (super.getChildContext && super.getChildContext()) || {}, {i18n});
      }
    }

    return Rosetta;
  };
};

