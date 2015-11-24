jest.dontMock('../lib/tribus');

var langs = {
  'pt-br': {
    'home_button_signup': 'Cadastrar',
    'home_button_signin': 'Acessar',
    'label_terms': '<a href="{href}">Aceito os termos de uso</a>'
  },
  'en-us': {
    'home_button_signup': 'Sign Up',
    'home_button_signin': 'Sign In',
    'label_terms': '<a href="{href}">Accept the terms</a>'
  }
};

var Tribus = require('../lib/tribus');
var t = new Tribus(langs, 'en-us', 'pt-br');
var tError = new Tribus(langs, 'de', 'de');

describe('Tribus Tests', function() {

  it('translate "home_button_signup" with "pt-br" to equal "Cadastrar"', function () {
    expect(t.print('home_button_signup')).toBe('Cadastrar');
  });

  it('translate "home_button_signin" with "pt-br" to equal "Acessar"', function () {
    expect(t.print('home_button_signin')).toBe('Acessar');
  });

  it('translate "label_terms" with "pt-br" to equal "Acessar"', function () {
    expect(t.print('label_terms', { href: 'http://github.com' })).toBe('<a href="http://github.com">Aceito os termos de uso</a>');
  });

  it('translate "label_terms" using "en-us" to equal "Sign Up"', function () {
    expect(t.print('label_terms', { href: 'http://google.com' }, 'en-us')).toBe('<a href="http://google.com">Accept the terms</a>');
  });

  it('translate "home_button_signin" using "en-us" to equal "Sign Up"', function () {
    expect(t.print('home_button_signin', 'en-us')).toBe('Sign In');
  });

  it('error: key_doesnt_exists must be null', function () {
    expect(t.print('key_doesnt_exists')).toBeNull();
  });

  it('error: language key doest\'t exist and get default "en-us"', function () {
    expect(t.print('home_button_signin', 'es')).toBe('Sign In');
  });

  it('error: language key and default key doest\'t exist"', function () {
    expect(tError.print('key_error')).toBeNull();
  });

});