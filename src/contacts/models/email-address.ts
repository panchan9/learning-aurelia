import {ValidationRules} from 'aurelia-validation';

enum EmailAddressType {
  HOME = 'Home',
  OFFICE = 'Office',
  OTHER = 'Other',
}

export class EmailAddress {

  type: EmailAddressType = EmailAddressType.HOME;
  address = '';

  constructor() {
    ValidationRules
      .ensure('type')
        .required()
        .satisfies(value => this.types.indexOf(value) >= 0)
      .ensure('address')
        .required()
        .maxLength(250)
        .email()
      .on(this);
  }

  static fromObject(src: EmailAddress) {
    return Object.assign(new EmailAddress(), src);
  }

  get types() {
    return Object.values(EmailAddressType);
  }
}

