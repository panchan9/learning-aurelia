import {autoinject} from 'aurelia-framework';
import {RouteConfig} from 'aurelia-router';
import {BindingSignaler} from 'aurelia-templating-resources';
import {ContactGateway} from './contact-gateway';
import {Contact} from './models';

type Params = { [index: string]: string };

@autoinject
export class ContactDetails {

  contact: Contact;
  rtUpdater: NodeJS.Timer | null;

  constructor(
    private gateway: ContactGateway,
    private signaler: BindingSignaler
  ) {}

  activate(params: Params, config: RouteConfig): Promise<void> {
    return this.gateway.getById(params.id)
      .then(contact => {
        this.contact = contact;
        config.navModel && config.navModel.setTitle(contact.fullName);

        this.rtUpdater = setInterval(
          () => this.signaler.signal('rt-update'), 1000
        );
      });
  }

  deactivate() {
    if (this.rtUpdater) {
      clearInterval(this.rtUpdater);
      this.rtUpdater = null;
    }
  }
}
