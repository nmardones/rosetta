import React from 'react';
import ReactDom from 'react-dom';
import Rosetta, {CHANGE_TRANSLATION_EVENT, rosetta} from '../src';
import Polyglot from '../src/adapters/polyglot';

// Set all languages as a JSON object with culture as Keys per language.
const languages = {
  'es-ES': {
    'HOLA': 'hola',
    'MUNDO': 'mundo!',
    'ES': 'Español',
    'EN': 'Ingles'
  },
  'en-GB': {
    'HOLA': 'hello',
    'MUNDO': 'world!',
    'ES': 'Spanish',
    'EN': 'English'
  }
};

// New instances of Rosseta with its own adapter.
let i18nOne = new Rosetta({adapter: new Polyglot()});
let i18nTwo = new Rosetta({adapter: new Polyglot()});

// Fill both apps with languages.
i18nOne.languages = i18nTwo.languages = languages;

// Set initial culture.
i18nOne.culture = 'es-ES';
i18nTwo.culture = 'en-GB';

// Define list item React Component.
class ListItem extends React.Component {
  render() {
    return <li>{this.context.i18n.t(this.props.text)}</li>;
  }
}
ListItem.contextTypes = {
  i18n: React.PropTypes.object
};

// Define first list React Component.
@rosetta(i18nOne, languages)
class ListOne extends React.Component {
  constructor(...args){
    super(...args);
    this.languages = this.getChildContext().languages;
  }
  changeCulture(culture) {
    this.i18n.culture = culture;
    this.i18n.emit(CHANGE_TRANSLATION_EVENT);
  }
  render() {
    return (
        <div>
          <ul>
            {
              ['HOLA', 'MUNDO', 'NON_EXISTING_LITERAL'].map((text, index) => {
                return (<ListItem key={index} text={text} />);
              })
            }
          </ul>
          <button onClick={this.changeCulture.bind(this, 'es-ES')}>{this.i18n.t('ES')}</button>
          <button onClick={this.changeCulture.bind(this, 'en-GB')}>{this.i18n.t('EN')}</button>
        </div>
    );
  }
}

// Define second list React Component.
@rosetta(i18nTwo, languages)
class ListTwo extends React.Component {
  constructor(...args){
    super(...args);
    this.languages = this.getChildContext().languages;
  }
  changeCulture(culture) {
    this.i18n.culture = culture;
    this.i18n.emit(CHANGE_TRANSLATION_EVENT);
  }
  render() {
    return (
        <div>
          <ul>
            {
              ['HOLA', 'MUNDO', 'NON_EXISTING_LITERAL'].map((text, index) => {
                return (<ListItem key={index} text={text} />);
              })
            }
          </ul>
          <button onClick={this.changeCulture.bind(this, 'es-ES')}>{this.i18n.t('ES')}</button>
          <button onClick={this.changeCulture.bind(this, 'en-GB')}>{this.i18n.t('EN')}</button>
        </div>
    );
  }
}

// Render All React Components.
ReactDom.render(<ListOne />, document.getElementById('list-container-one'));
ReactDom.render(<ListTwo />, document.getElementById('list-container-two'));
