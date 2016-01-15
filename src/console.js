/* eslint no-console:0 */

const warn = (msg, ...args) => {
  return console && console.warn && console.warn.apply(console, ['WARN LOG:', msg].concat(args));
};

export default {warn};
