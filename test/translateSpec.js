/* eslint no-unused-expressions:0 */
import {expect} from 'chai';

import i18n from '../src';

describe('I18N', () => {
  it('is a singleton instance', () => {
    expect(i18n).to.not.be.undefined;
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
      i18n.on('translations', (dicc) => {
        expect(dicc).to.be.equal(newTranslations);
        done();
      });

      i18n.translations = newTranslations;
    });
  });
});
