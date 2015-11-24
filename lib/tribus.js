'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Translate your webapp, site or whatever using JS
 */

var Tribus = (function () {

  /**
   * Constructor Tribus
   * @param  {Object} langs       Your languages object
   * @param  {String} defaultLang See LANGUAGES_CODES
   */

  function Tribus(langs) {
    var defaultLang = arguments.length <= 1 || arguments[1] === undefined ? 'en-us' : arguments[1];

    _classCallCheck(this, Tribus);

    // Get user browser language
    this.userLang = (arguments[2] || this._getLanguage()).toLowerCase();

    // Set default lang
    this.defaultLang = defaultLang.toLowerCase();

    this.langs = langs;
  }

  /**
   * Return the string translated
   * @param  {String}         key               The key from your language object
   * @param  {Object|String}  supplant or lang  If object, will supplant the string, If string, will override language
   * @param  {String}         lang              Override user language and default language
   * @return {String}                           The string translated and supplanted
   */

  _createClass(Tribus, [{
    key: 'print',
    value: function print(key) {
      var value = undefined;
      var langKey = this.langs[(arguments[2] || this.userLang).toLowerCase()];
      var supplantOrLang = arguments[1];

      try {
        // language key must exist
        if ((typeof langKey === 'undefined' ? 'undefined' : _typeof(langKey)) !== 'object') throw 'Tribus Error: No translation object was found.';

        // param "key" must be a "string"
        if (typeof key !== 'string') {
          throw 'Tribus Error: The param "key" must be a string.';
        }

        value = langKey[key.trim()];

        if (!!!value) throw 'Tribus Error: The key "' + key + '" was not found.';

        if ((typeof supplantOrLang === 'undefined' ? 'undefined' : _typeof(supplantOrLang)) === 'object') {
          if (!!Object.keys(supplantOrLang).length) {
            value = this._supplant(value, supplantOrLang);
          }
        }

        // If the second param is string
        if (typeof supplantOrLang === 'string') {
          supplantOrLang = supplantOrLang.toLowerCase();

          // If language key is in languages object
          if (supplantOrLang in this.langs) {
            value = this.langs[supplantOrLang.toLowerCase()][key.trim()];
          } else {
            // ... if not, get the default language
            if (this.defaultLang in this.langs) {
              console.warn('Tribus Warning: The lang "' + supplantOrLang + '" was not found. It will use the default language "' + this.defaultLang + '".');

              value = this.langs[this.defaultLang][key.trim()];
            } else {
              throw 'Tribus Error: Houston, we have a problem ... No translation was found. Aborting ...';
            }
          }
        }
      } catch (err) {
        console.error(err);

        value = null;
      }

      return value;
    }

    /**
     * Get the user language
     * @return {string} Language code
     */

  }, {
    key: '_getLanguage',
    value: function _getLanguage() {
      var nav = window.navigator;
      var browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];
      var language = '';
      var i = 0;

      // support for HTML 5.1 "navigator.languages"
      if (Array.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
          language = nav.languages[i];
          if (language && language.length) {
            return language;
          }
        }
      }

      // support for other well known properties in browsers
      for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]];
        if (language && language.length) {
          return language;
        }
      }

      return null;
    }
  }, {
    key: '_supplant',
    value: function _supplant(str, o) {
      return str.replace(/{([^{}]*)}/g, function (a, b) {
        var r = o[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
      });
    }
  }]);

  return Tribus;
})();

module.exports = Tribus;