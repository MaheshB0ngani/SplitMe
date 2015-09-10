'use strict';

const Lie = require('lie');
const IntlPolyfill = require('intl');

const polyglot = require('polyglot');

function getCurrent() {
  const defaultLocale = 'en';

  const availabled = {
    en: true,
    fr: true,
  };

  let language = navigator.language.toLowerCase();

  if (availabled[language]) {
    return language;
  }

  language = language.substring(0, 2);

  if (availabled[language]) {
    return language;
  }

  return defaultLocale;
}

const _current = getCurrent();

polyglot.locale(_current);

const locale = {
  current: _current,
  intl: IntlPolyfill,
  currencyToString: function(currency) {
    const amount = new locale.intl.NumberFormat(_current, { style: 'currency', currency: currency })
      .format(0);

    return amount.replace(/[0,.\s]/g, '');
  },
  load: function() {
    const localeRequire = require.context('promise?lie!./locale', false, /^.\/(en|fr).js$/);
    const localePromise = localeRequire('./' + _current + '.js');

    const intlRequire = require.context('promise?lie!intl/locale-data/jsonp', false, /^.\/(en|fr).js$/);
    const intlPromise = intlRequire('./' + _current + '.js');

    const promises = [
      localePromise().then(function(phrases) {
        polyglot.extend(phrases);
      }),
      intlPromise(),
    ];

    // moment already include the locale EN
    if (_current !== 'en') {
      const momentRequire = require.context('promise?lie!moment/locale', false, /^.\/(en|fr).js$/);
      const momentPromise = momentRequire('./' + _current + '.js');

      promises.push(momentPromise());
    }

    return Lie.all(promises);
  },
};

module.exports = locale;
