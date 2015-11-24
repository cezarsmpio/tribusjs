# Tribus

Tribus is a small and simple library to translate texts. It catches the user's browser language to choose the text.

## Install

```
npm install --save tribusjs
```

## Usage

```javascript
import Tribus from 'tribusjs';

var langs = {
  'pt-br': {
    // Notificações
    "notify_user_already_exists": "Este email ({email}) já está sendo usado por outra pessoa.",
    "notify_user_doest_not_exists": "Não foi encontrado nenhum usuário.",
    "notify_user_auth_error": "Você digitou sua senha corretamente?",
    "notify_user_create_account_success": "Sua conta foi criada com sucesso! Estamos redirecionando você para o painel...",
    "notify_default": "Não foi possível terminar a operação, por favor, tente novamente.",
    "notify_ok": "<a href="{href}">Ok. Eu entendi.</a>"
  },

  'en-us': {
    // Notifications
    "notify_user_already_exists": "This email ({email}) is already used by someone else.",
    "notify_user_doest_not_exists": "No user was found.",
    "notify_user_auth_error": "You typed your password correctly?",
    "notify_user_create_account_success": "Your account has been successfully created! We are redirecting you to the dashboard...",
    "notify_default": "Could not finish the operation, please try again.",
    "notify_ok": "<a href="{href}">Ok. I got it.</a>"
  },

  'de': {
     // Benachrichtigungen
     "notify_user_already_exists": "Diese E-Mail ({email}) ist bereits von jemand anderem verwendet wird."
     "notify_user_doest_not_exists": "Kein Benutzer gefunden wurde.",
     "notify_user_auth_error": "Sie gaben Ihr Kennwort richtig?",
     "notify_user_create_account_success": "Ihr Konto wurde erfolgreich erstellt Wir werden Sie auf dem Armaturenbrett ...",
     "notify_default": "Der Vorgang konnte nicht abgeschlossen haben, versuchen Sie es erneut."
     "notify_ok": "<a href="{href}"> Ok, ich habe es..</a>"
  },

  'es': {
     // Notificaciones
     "notify_user_already_exists": "Este correo ({email}) electrónico está ya utilizados por otra persona.",
     "notify_user_doest_not_exists": "No se encontró el usuario.",
     "notify_user_auth_error": "Ha escrito la contraseña correctamente?",
     "notify_user_create_account_success": "Su cuenta ha sido creada con éxito te vamos a redirigir el salpicadero ...",
     "notify_default": "No se pudo terminar la operación, por favor intente de nuevo.",
     "notify_ok": "<a href="{href}"> Ok lo tengo.</a>".
  }
};

let t = new Tribus(langs);

// User language is 'pt-br'
t.print('notify_user_already_exists', { email: 'person@domain.com' }); // Este email (person@domain.com) já está sendo usado por outra pessoa.

// User language is 'de'
t.print('notify_user_already_exists', { email: 'person@domain.com' }); // Diese E-Mail (person@domain.com) ist bereits von jemand anderem verwendet wird.

// Replace variable data
t.print('notify_ok', { href: 'http://google.com' }, 'es'); // <a href="http://google.com"> Ok lo tengo.</a>

// Change the DOM; Simple example
document.body.innerHTML = t.print('notify_ok', { href: 'http://github.com' }); // <a href="http://github.com"> Ok lo tengo.</a>

// Override language; User language is 'de'
t.print('notify_user_doest_not_exists', 'en-us'); // No user was found.

// User language is 'de' but suppose it doesn't exist; Get the default 'en-us'
t.print('notify_user_auth_error'); // You typed your password correctly?
```

## API

```javascript
Tribus (object languages_objects [, string defaultLang = 'en-us'] [, string language_default = USER_BROSWER_LANGUAGE])

string Tribus.print (string key, [, object supplant] [, string override_user_browser_language])

string Tribus.print (string key, [, string override_user_browser_language])

```

## Important!

The translation object keys must be all lowercase.

For example:

```javascript
// good
{
  'en-us': {...},
  'de': {...},
  'es': {...},
  'pt-br': {...}
}

// bad
{
  'EN-US': {...},
  'DE': {...},
  'ES': {...},
  'PT-BR': {...}
}
```

[View all language codes](https://github.com/CezarLuiz0/tribus/blob/master/LANGUAGE_CODES.md)

## Tests

To run the tests: `npm install && npm test`

Using `jest` to testing.