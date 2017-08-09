import {autoinject} from 'aurelia-framework';
import {Router, RouteConfig} from 'aurelia-router';
import {ContactGateway} from './contact-gateway';
import {
  Contact,
  types,
} from './models';
import {log, cn} from './resources/logger';

type Params = { [index: string]: string };

@autoinject
export class ContactEdition {

  contact: Contact;
  isNew: boolean;
  types = types;

  constructor(
    private gateway: ContactGateway,
    private router: Router,
  ) {}

  activate(params: Params, config: RouteConfig): Promise<void> | void {
    this.isNew = params.id === undefined;

    if (this.isNew) {
      this.contact = new Contact();
    } else {
      return this.gateway.getById(params.id).then(contact => {
        this.contact = contact;
        config.navModel && config.navModel.setTitle(contact.fullName);
      });
    }
  }

  save() {
    if (this.isNew) {
      this.gateway.create(this.contact)
        .then(() => this.router.navigateToRoute('contacts'));
    } else {
      this.gateway.update(this.contact.id, this.contact)
        .then(() => this.router.navigateToRoute('contact-details', { id: this.contact.id }));
    }
  }
}
