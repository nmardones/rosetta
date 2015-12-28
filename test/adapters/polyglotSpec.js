/* eslint no-unused-expressions:0 */
import {expect} from 'chai';

import Rosetta, {CHANGE_TRANSLATION_EVENT, rosetta} from '../../src';
import Polyglot from '../../src/adapters/polyglot';

// Borrowed from https://github.com/airbnb/polyglot.js/blob/master/test/main.coffee

const phrases = {
  'hello': 'Hello',
  'hi_name_welcome_to_place': 'Hi, %{name}, welcome to %{place}!',
  'name_your_name_is_name': '%{name}, your name is %{name}!',
  'empty_string': ''
};

const nestedPhrases = {
  'nav': {
    'presentations': 'Presentations',
    'hi_user': 'Hi, %{user}.',
    'cta': {
      'join_now': 'Join now!'
    }
  },
  'header.sign_in': 'Sign In'
};

const pluralizePhrases = {
  'count_name': '%{smart_count} Name |||| %{smart_count} Names'
};

const urlTokens = {
  'rent': 'Alquiler',
  'house': 'Casa',
  'elevator': 'ascensor'
};

describe('I18N with polyglot adapter', () => {
  let i18n;
  beforeEach( () => i18n = new Rosetta({adapter: new Polyglot()}));
  afterEach( () => i18n = null);

  describe('translate', () => {
    beforeEach(() => i18n.translations = phrases);

    it('should translate a simple string', () => expect(i18n.t('hello')).to.eql('Hello'));

    it('should return the key if translation not found', () => expect(i18n.t('bogus_key')).to.eql('bogus_key'));

    it('should interpolate', () => {
      expect(i18n.t('hi_name_welcome_to_place', {name: 'Spike', place: 'the webz'}))
        .to.eql('Hi, Spike, welcome to the webz!');
    });

    it('should interpolate the same placeholder multiple times', () => {
      expect(i18n.t('name_your_name_is_name', {name: 'Spike'}))
        .to.eql('Spike, your name is Spike!');
    });

    it('should allow you to supply default values', () => {
      expect(i18n.t('can_i_call_you_name', {_: 'Can I call you %{name}?', name: 'Robert'}))
        .to.eql('Can I call you Robert?');
    });

    it('should return the non-interpolated key if not initialized with allowMissing and translation not found', () => {
      expect(i18n.t('Welcome %{name}', {name: 'Robert'}))
        .to.eql('Welcome %{name}');
    });

    describe('setting allowMissing', () => {
      beforeEach(() => i18n.adapter.instance.allowMissing = true);
      afterEach(() => i18n.adapter.instance.allowMissing = false);
      it('should return an interpolated key if initialized with allowMissing and translation not found', () => {
        expect(i18n.t('Welcome %{name}', {name: 'Robert'}))
          .to.eql('Welcome Robert');
      });
    });

    it('should return the translation even if it is an empty string', () => {
      expect(i18n.t('empty_string')).to.eql('');
    });

    it('should return the default value even if it is an empty string', () => {
      expect(i18n.t('bogus_key', {_: ''})).to.eql('');
    });

    describe('nested phrase objects', () => {
      beforeEach(() => i18n.translations = nestedPhrases);
      afterEach(() => i18n.translations = phrases);
      it('should translate a simple string', () => {
        expect(i18n.t('nav.presentations')).to.eql('Presentations');
        expect(i18n.t('nav.hi_user', {user: 'Raph'})).to.eql('Hi, Raph.');
        expect(i18n.t('nav.cta.join_now')).to.eql('Join now!');
        expect(i18n.t('header.sign_in')).to.eql('Sign In');
      });
    });

    describe('locale', () => {
      afterEach(() => i18n.adapter.locale = null);

      it('default locale is \"en\"', () => {
        expect(i18n.adapter.locale).to.eql('en');
      });

      it('change to es', () => {
        i18n.adapter.locale = 'es';
        expect(i18n.adapter.locale).to.eql('es');
      });
    });

    describe('pluralize', () => {
      beforeEach(() => {
        i18n.adapter.locale = 'es';
        i18n.translations = pluralizePhrases;
      });
      afterEach(() => {
        i18n.adapter.locale = null;
        i18n.translations = phrases;
      });
      it('should support pluralization with an integer', () => {
        expect(i18n.t('count_name', 2)).to.eql('2 Names');
      });
    });

    describe('url', () => {
      const urlPattern = 'rent/house/marbella/elevator';
      const expectedUrl = 'alquiler/casa/marbella/ascensor';

      beforeEach(() => {
        i18n.adapter.locale = 'es';
        i18n.translations = urlTokens;
      });
      afterEach(() => {
        i18n.adapter.locale = null;
        i18n.translations = phrases;
      });
      it('should translate all the tokens in a url', () => {
        expect(i18n.url(urlPattern)).to.eql(expectedUrl);
      });
    })
  });
});


