import {autoinject} from 'aurelia-framework';
import {Router, RouteConfig} from 'aurelia-router';
import {BindingSignaler} from 'aurelia-templating-resources';
import {I18N} from 'aurelia-i18n';
import {ContactGateway} from './contact-gateway';
import {Contact, SocialProfileType} from './models';

type Params = { [index: string]: string };

@autoinject
export class ContactDetails {

  contact: Contact;
  socialProfileType = SocialProfileType;
  rtUpdater: NodeJS.Timer | null;

  constructor(
    private gateway: ContactGateway,
    private router: Router,
    private signaler: BindingSignaler,
    private i18n: I18N,
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

  tryDelete(): void {
    if (confirm(this.i18n.tr('contacts.confirmDelete'))) {
      this.gateway.delete(this.contact.id)
        .then(() => { this.router.navigateToRoute('contacts'); });
    }
  }
}
