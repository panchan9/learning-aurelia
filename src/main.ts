import {Aurelia} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import * as Backend from 'i18next-xhr-backend';
import environment from './environment';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-i18n', (instance: I18N) => {
      // instance.i18next.use(Backend.with(aurelia.loader));
      instance.i18next.use(Backend);

      return instance.setup({
        backend: {
          loadPath: './locales/{{lng}}/{{ns}}.json',
        },
        lng: 'en',
        fallbackLng: 'en',
        debug: environment.debug
      });
    });

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
