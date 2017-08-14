import {autoinject} from 'aurelia-framework';
import {Router, RouteConfig} from 'aurelia-router';
import {ValidationController, ValidationControllerFactory} from 'aurelia-validation';
import {BootstrapFormValidationRenderer} from './validation/bootstrap-form-validation-renderer';
import {ContactGateway} from './contact-gateway';
import {Contact, types} from './models';
import {log, cn} from './resources/logger';

type Params = { [index: string]: string };

@autoinject
export class ContactEdition {

  contact: Contact;
  isNew: boolean;
  types = types;
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

  save(): void {
    this.validationController.validate().then(validationResult => {

      log.debug('validationResult: ', validationResult);
      log.debug('validationController.errors: ', this.validationController.errors);
      if (!validationResult.valid) return;

      if (this.isNew) {
        this.gateway.create(this.contact)
          .then(() => this.router.navigateToRoute('contacts'));
      } else {
        this.gateway.update(this.contact.id, this.contact)
          .then(() => this.router.navigateToRoute('contact-details', { id: this.contact.id }));
      }

    });
  }
}
