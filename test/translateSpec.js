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

    afterEach(() => i18nCulture = '');

    describe('locale', () => {

      it('default locale is \"en\"', () => {
        expect(i18nCulture.locale).to.eql('en');
      });

      it('change to es', () => {
        i18nCulture.culture = 'es-ES';
        expect(i18nCulture.locale).to.eql('es');
      });
    });

    describe('culture', () => {
      beforeEach(() => i18nCulture.culture = 'en-GB');
      afterEach(() => i18nCulture.culture = '');

      it('set culture', () => {
        expect(i18nCulture.culture).to.eql('en-GB');
        expect(i18nCulture.t('literalOne')).to.eql('TranslateOneEnGB');
      });
    });
  });
});
