import {autoinject} from 'aurelia-framework';
import {Router, RouteConfig} from 'aurelia-router';
import {
  ValidationRules,
  ValidationController,
  ValidationControllerFactory,
  validateTrigger,
} from 'aurelia-validation';
import {BootstrapFormValidationRenderer} from './validation/bootstrap-form-validation-renderer';
import {ContactGateway} from './contact-gateway';
import {Contact} from './models';
import {log, cn} from './resources/logger';

type Params = { [index: string]: string };

@autoinject
export class ContactPhoto {

  contact: Contact;
  photo: FileList;
  validationController: ValidationController;

  constructor(
    private gateway: ContactGateway,
    private router: Router,
    private validationControllerFactory: ValidationControllerFactory,
  ) {
    cn(this);
    this.validationController = this.validationControllerFactory.createForCurrentScope();
    this.validationController.addRenderer(new BootstrapFormValidationRenderer());
    this.validationController.validateTrigger = validateTrigger.change;

    ValidationRules
      .ensure('photo')
        .satisfiesRule('notEmpty')
          .withMessage('${$displayName} msut contain one file.')
        .satisfiesRule('maxFileSize', 2)
        .satisfiesRule('fileExtension', ['.jpg', '.png'])
      .on(this);
  }

  activate(params: Params, config: RouteConfig) {
    return this.gateway.getById(params.id).then(contact => {
      this.contact = contact;
      config.navModel && config.navModel.setTitle(this.contact.fullName);
    });
  }

  save(): void {
    this.validationController.validate().then(validationResult => {
      log.debug('validationResult:', validationResult);
      if (!validationResult.valid) return;

      this.gateway.updatePhoto(this.contact.id, this.photo.item(0))
        .then(() => {
          this.router.navigateToRoute('contact-details', { id: this.contact.id });
        });
    });
  }
}
