/* eslint no-unused-expressions:0 */
import {expect} from 'chai';

import Rosetta, {CHANGE_TRANSLATION_EVENT} from '../src';
import Polyglot from '../src/adapters/polyglot';

describe('I18N', () => {
  let i18n;
  beforeEach( () => i18n = new Rosetta());
  afterEach( () => i18n = null);

  it('is an instantiable class', () => {
    expect(Rosetta).to.not.be.undefined;
  });

  describe('with the default adapter', () => {
    it('expect return the same key used for translate', () => {
      const key = 'That is a key';
      expect(i18n.t(key)).to.be.eql(key);
    });
  });

  describe('when change the translations', () => {
    it('expect a notification for the event \"translations\" with the new dicc', (done) => {
      const newTranslations = {key: 'llave'};
      i18n.on(CHANGE_TRANSLATION_EVENT, (dicc) => {
        expect(dicc).to.be.equal(newTranslations);
        done();
      });

      i18n.translations = newTranslations;
    });

    it('we can change the translation in a silent mode', (done) => {
      let silent = true;
      i18n.on(CHANGE_TRANSLATION_EVENT, () => {
        silent = false;
      });

      i18n.setTranslationsSilent({key: 'llave'}, 'es-ES');

      setTimeout(() => {
        expect(silent).to.be.true;
        expect(i18n.culture).to.be.eq('es-ES');
        done();
      }, 50);
    });
  });

  describe('using the languages setting we change the culture', () => {
    let i18nCulture;
    beforeEach( () => {

      i18nCulture = new Rosetta({adapter: new Polyglot()});
      i18nCulture.languages = {
        'es-ES': {
          'literalOne': 'TranslateOneEsES'
        },
        'en-GB': {
          'literalOne': 'TranslateOneEnGB'
        },
        'es-CA': {
          'literalOne': 'TranslateOneEsCA'
        }
      };
    } );

    afterEach(() => i18nCulture = null);

    describe('locale', () => {
      afterEach(() => i18nCulture.adapter.locale = null);

      it('default locale is \"en\"', () => {
        expect(i18nCulture.adapter.locale).to.eql('en');
      });

      it('change to es', () => {
        i18nCulture.adapter.locale = 'es';
        expect(i18nCulture.adapter.locale).to.eql('es');
      });
    });

    describe('culture', () => {
      afterEach(() => i18nCulture.culture = null);

      it('set culture', () => {
        i18nCulture.culture = 'en-GB';
        expect(i18nCulture.culture).to.eql('en-GB');
        expect(i18nCulture.t('literalOne')).to.eql('TranslateOneEnGB');
      });
    });

  });
});
