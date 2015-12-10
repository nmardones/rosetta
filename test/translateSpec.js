/* eslint no-unused-expressions:0 */
import {expect} from 'chai';

import Rosetta, {CHANGE_TRANSLATION_EVENT, rosetta} from '../src';

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
      i18n.on(CHANGE_TRANSLATION_EVENT, (dicc) => {
        silent = false;
      });

      i18n.setTranslationsSilent({key: 'llave'});

      setTimeout(() => {
        expect(silent).to.be.true;
        done();
      }, 50)

    });
  });
});
