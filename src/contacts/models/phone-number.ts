import {ValidationRules} from 'aurelia-validation';

enum PhoneNumberType {
  HOME = 'Home',
  OFFICE = 'Office',
  MOBILE = 'Mobile',
  OTHER = 'Other',
}

export class PhoneNumber {

  type: PhoneNumberType = PhoneNumberType.HOME;
  number = '';

  constructor() {
    ValidationRules
      .ensure('type')
        .required()
        .satisfies(value => this.types.indexOf(value) >= 0)
      .ensure('number')
        .required()
        .maxLength(25)
      .on(this);
  }

  static fromObject(src: PhoneNumber): PhoneNumber {
    return Object.assign(new PhoneNumber(), src);
  }

  get types() {
    return Object.values(PhoneNumberType);
  }
}


