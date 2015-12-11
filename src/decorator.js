import React from 'react';
import {CHANGE_TRANSLATION_EVENT} from './';

export const rosetta = (i18n, languages) => {
  return (Target) => {

    // Prevent context varaibles
    // https://github.com/rackt/react-router/issues/484#issuecomment-131066254
    class Rosetta extends Target {

      static get childContextTypes(){
        let ctxt = Object.assign({}, super.childContextTypes, {
          i18n: React.PropTypes.object
        });

        return !languages ? ctxt : Object.assign({}, ctxt, {
          languages: React.PropTypes.object
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
        let ctxt = Object.assign({}, (super.getChildContext && super.getChildContext()) || {}, {i18n});
        return !languages ? ctxt : Object.assign({}, ctxt, {languages});
      }
    }

    return Rosetta;
  };
};

