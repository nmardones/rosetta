import React from 'react';
import ReactDom from 'react-dom';
import './index.scss'
import Rosetta, {CHANGE_TRANSLATION_EVENT, rosetta} from '../src';
import Polyglot from '../src/adapters/polyglot';

const spanish = {
  'HOLA': 'hola',
  'MUNDO': 'mundo!',
  'ES': 'Español',
  'EN': 'Ingles'
};

const english = {
  'HOLA': 'hello',
  'MUNDO': 'world!',
  'ES': 'Spanish',
  'EN': 'English'
};

let i18n = new Rosetta();
let i18nTwo = new Rosetta();

i18n.adapter = new Polyglot();
i18nTwo.adapter = new Polyglot();



// Init the app with spanish
i18n.translations = english;

// Init the app with english
i18nTwo.translations = spanish;


class Item extends React.Component {
  render() {
    return <li>{this.context.i18n.t(this.props.text)}</li>;
  }
}

@rosetta(i18n)
class List extends React.Component {

  changeLanguage(language) {
    this.i18n.translations = language === 'en' ? english : spanish;
  }
  render() {
    return (
        <div>
          <ul>
            {
              ["HOLA", "MUNDO"].map((text, index) => {
                return (<Item key={index} text={text} />);
              })
            }
          </ul>
          <button onClick={this.changeLanguage.bind(this, 'es')}>{this.i18n.t('ES')}</button>
          <button onClick={this.changeLanguage.bind(this, 'en')}>{this.i18n.t('EN')}</button>
        </div>
    )
  }
}

Item.contextTypes = {
  i18n: React.PropTypes.object,
  id: React.PropTypes.number
};


@rosetta(i18nTwo)
class ListTwo extends React.Component {

  changeLanguage(language) {
    this.i18n.translations = language === 'en' ? english : spanish;
  }
  render() {
    return (
        <div>
          <ul>
            {
              ["HOLA", "MUNDO"].map((text, index) => {
                return (<Item key={index} text={text} />);
              })
            }
          </ul>
          <button onClick={this.changeLanguage.bind(this, 'es')}>{this.i18n.t('ES')}</button>
          <button onClick={this.changeLanguage.bind(this, 'en')}>{this.i18n.t('EN')}</button>
        </div>
    )
  }
}



ReactDom.render(<List />, document.getElementById('list-container'));
ReactDom.render(<ListTwo />, document.getElementById('list-container-two'));
