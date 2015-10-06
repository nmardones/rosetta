import React from 'react';
import ReactDom from 'react-dom';
import './index.scss'
import i18n, {CHANGE_TRANSLATION_EVENT, rosetta} from '../src';
import polyglot from '../src/adapters/polyglot';

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

debugger;
i18n.adapter = polyglot;
// Init the app with spanish
i18n.translations = spanish;


class Item extends React.Component {
  render() {
    return <li>{i18n.t(this.props.text)}</li>;
  }
}

@rosetta
class List extends React.Component {
  changeLanguage(language) {
    i18n.translations = language === 'en' ? english : spanish;
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
          <button onClick={this.changeLanguage.bind(this, 'es')}>{i18n.t('ES')}</button>
          <button onClick={this.changeLanguage.bind(this, 'en')}>{i18n.t('EN')}</button>
        </div>
    )
  }
}

ReactDom.render(<List />, document.getElementById('list-container'));
