import {autoinject} from 'aurelia-framework';
import {Router, RouteConfig} from 'aurelia-router';
import {ValidationController, ValidationControllerFactory} from 'aurelia-validation';
import {BootstrapFormValidationRenderer} from './validation/bootstrap-form-validation-renderer';
import {ContactGateway} from './contact-gateway';
import {Contact} from './models';
import {log, cn} from './resources/logger';

type Params = { [index: string]: string };

@autoinject
export class ContactEdition {

  contact: Contact;
  isNew: boolean;
  validationController: ValidationController;

  constructor(
    private gateway: ContactGateway,
    private router: Router,
    private validationControllerFactory: ValidationControllerFactory,
  ) {
    cn(this);
    this.validationController = validationControllerFactory.createForCurrentScope();
    this.validationController.addRenderer(new BootstrapFormValidationRenderer());
  }

  activate(params: Params, config: RouteConfig): Promise<void> | void {
    return this.gateway.getById(params.id).then(contact => {
      this.contact = contact;
      config.navModel && config.navModel.setTitle(contact.fullName);
    });
  }

  save() {
    this.validationController.validate().then(validationResult => {
      if (!validationResult.valid) return Promise.reject(null);

      log.debug('contact:', this.contact);
      return this.gateway.update(this.contact.id, this.contact)
        .then(() => this.router.navigateToRoute('contact-details', { id: this.contact.id }));
    });
  }
}
