import {autoinject} from 'aurelia-framework';
import {
  ValidationController,
  ValidationControllerFactory,
} from 'aurelia-validation';
import {BootstrapFormValidationRenderer} from './validation/bootstrap-form-validation-renderer';
import {Router} from 'aurelia-router';
import {ContactGateway} from './contact-gateway';
import {Contact} from './models';

@autoinject
export class ContactCreation {

  contact = new Contact;
  validationController: ValidationController;

  constructor(
    private gateway: ContactGateway,
    private router: Router,
    private validationControllerFactory: ValidationControllerFactory,
  ) {
    this.validationController = this.validationControllerFactory.createForCurrentScope();
    this.validationController.addRenderer(new BootstrapFormValidationRenderer());
  }

  save() {
    this.validationController.validate().then(validationResult => {
      if (!validationResult.valid) return Promise.reject(null);

      return this.gateway.create(this.contact)
        .then(() => this.router.navigateToRoute('contacts'));
    });
  }
}
