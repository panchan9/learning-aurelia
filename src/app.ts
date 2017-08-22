import {Router, RouterConfiguration} from 'aurelia-router';

export class App {

  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {

    config.title = 'Learning Aurelia';
    config.options.pushState = true;
    config.options.hasChange = false;
    config.map([
      { route: '', redirect: 'contacts' },
      { route: 'contacts', name: 'contacts', moduleId: 'contact-list', nav: true, title: 'Contacts' },
      { route: 'contacts/new', name: 'contact-creation', moduleId: 'contact-creation', title: 'New contact' },
      { route: 'contacts/:id', name: 'contact-details', moduleId: 'contact-details' },
      { route: 'contacts/:id/edit', name: 'contact-edition', moduleId: 'contact-edition' },
      { route: 'contacts/:id/photo', name: 'contact-photo', moduleId: 'contact-photo' },
    ]);
    config.mapUnknownRoutes('not-found');

    this.router = router;
  }
}
