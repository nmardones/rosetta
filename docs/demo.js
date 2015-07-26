import './demo.scss'
import i18n, {CHANGE_TRANSLATION_EVENT} from '../src';
import polyglot from '../src/adapters/polyglot';

i18n.on('translations', (dicc) => console.log(dicc));

i18n.adapter = polyglot;
i18n.translations = {key: 'value'};

console.log( i18n.t('key') );
