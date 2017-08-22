import {ValidationRules} from 'aurelia-validation';

enum AddressType {
  HOME = 'Home',
  OFFICE = 'Office',
  OTHER = 'Other',
}

export class Address {

  type: AddressType = AddressType.HOME;
  number = '';
  street = '';
  postalCode = '';
  city = '';
  state = '';
  country = '';

  constructor() {
    ValidationRules
      .ensure('type')
        .required()
        .satisfies(value => this.types.indexOf(value) >= 0)
      .ensure('number')
        .required()
        .maxLength(100)
      .ensure('street')
        .required()
        .maxLength(100)
      .ensure('postalCode')
        .required()
        .maxLength(25)
      .ensure('city')
        .required()
        .maxLength(100)
      .ensure('state')
        .required()
        .maxLength(100)
      .ensure('country')
        .required()
        .maxLength(100)
      .on(this);
  }

  static fromObject(src: Address) {
    return Object.assign(new Address, src);
  }

  get types() {
    return Object.values(AddressType);
  }
}

