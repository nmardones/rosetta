# Rosetta

The goal of Rosetta is to link your own I18N solution to SUI-* components. 

The main idea behind Rosetta is that I18N is not a ReactJS problem, thus, one should not add another component solely dedicated to translation. Instead, literals within components will be the argument of a function such as the following:


```javascript
i18n.t(‘This is a literal to be translated’)
```

The output of this call will depend both on the adapter and on the dictionary that you had previously loaded on Rosetta. In this way, you may internationalize your components without worrying which I18N library your client is using.

## Install

### npm

```javascript
$ npm run @schibstedspain/rosetta

```

### Clone the repo

```
$ npm clone https://github.com/SUI-Components/rosetta
$ cd rosetta
$ npm install
$ npm run dev
```

Go to http://localhost:8080 to see the demo.

## Use

Rosetta will also work perfectly with AngularJS or Backbone. All you need to do is set your I18N library adapter to Rosetta and then load the literals dictionary. Currently there is only one adapter for Airbnb’s I18N library, [Polyglot] (https://github.com/airbnb/polyglot.js). It’d be great to see new pull requests with new adapters. You may think about it as a sort of [consolidate](https://github.com/tj/consolidate.js/) for I18N libraries.


#### Loading the library and the adapter

```javascript
import i18n, {CHANGE_TRANSLATION_EVENT, rosetta} from '@schibstedspain/rosetta';
import polyglot from '@schibstedspain/rosetta/adapters/polyglot';

i18n.adapter = polyglot;
i18n.translations = {
    'HELLO_WORLD': 'Hola mundo!'
};

i18n.t('HELLO_WORLD') //=> Hola mundo!
```

From now on, Rosetta will use Polyglot to translate your literals anywhere in your app.

### Changing the dictionary

Anytime part of your code changes dictionaries, `I18N` will output a **translations** event, allowing you to react accordingly, in case you need to take an additional action(s) when there’s a change of language in your app.

### Creating your own adapters 

An adapter is just a Javascript object with two obligatory attributes:

* **translations** will be in charge of managing the necessary logic to load a new dictionary on your I18N library.
* **translate** is a function that gets, as a first parameter, a string with the key/literal; and, as a second parameter, an object with the values of the variables that you may need to insert.

Check out Polyglot’s [sample adapter](https://github.com/SUI-Components/rosetta/blob/master/src/adapters/polyglot.js).

### Use with ReactJS

In order to simplify the use of Rosetta in combination with React, a decorator is provided that must be used in the main component of the app. In this way, we can ensure that components are being notified every time there’s a change in language, and make the corresponding shift.

```javascript
 // app.js

 import React from 'react';
 import {rosetta} from '@schibstedspain/rosetta';

 @rosetta //=> This decorator allows us to update all components if there is a change of language 
 class App extends React.Component {
    render(){
        <div></div>
    }
 }
```

```javascript
 // index.js

 import i18n from '@schibstedspain/rosetta';
 import polyglot from '../src/adapters/polyglot';
 import App from '../app';

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

  i18n.adapter = polyglot;
  i18n.translations = english;

  React.render( <App/ >, document.getElementById('app'));
```
