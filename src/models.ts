import {ValidationRules} from 'aurelia-validation';

interface ContactSrc {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  phoneNumbers: PhoneNumber[];
  emailAddresses: EmailAddress[];
  addresses: Address[];
  socialProfiles: SocialProfile[];
  note: string;
}

enum PhoneNumberType {
  HOME = 'Home',
  OFFICE = 'Office',
  MOBILE = 'Mobile',
  OTHER = 'Other',
}

enum EmailAddressType {
  HOME = 'Home',
  OFFICE = 'Office',
  OTHER = 'Other',
}

enum AddressType {
  HOME = 'Home',
  OFFICE = 'Office',
  OTHER = 'Other',
}

export enum SocialProfileType {
  GITHUB = 'GitHub',
  TWITTER = 'Twitter',
}

export const types = {
  phoneNumber: Object.values(PhoneNumberType),
  emailAddress: Object.values(EmailAddressType),
  address: Object.values(AddressType),
  socialProfile: Object.values(SocialProfileType),
};

export class PhoneNumber {

  type: PhoneNumberType = PhoneNumberType.HOME;
  number = '';

  constructor() {
    ValidationRules
      .ensure('type')
        .required()
        .satisfies(value => Object.values(PhoneNumberType).indexOf(value) >= 0)
      .ensure('number')
        .required()
        .maxLength(25)
      .on(this);
  }

  static fromObject(src: PhoneNumber): PhoneNumber {
    return Object.assign(new PhoneNumber(), src);
  }
}

export class EmailAddress {

  type: EmailAddressType = EmailAddressType.HOME;
  address = '';

  constructor() {
    ValidationRules
      .ensure('type')
        .required()
        .satisfies(value => Object.values(EmailAddressType).indexOf(value) >= 0)
      .ensure('address')
        .required()
        .maxLength(250)
        .email()
      .on(this);
  }

  static fromObject(src: EmailAddress) {
    return Object.assign(new EmailAddress(), src);
  }
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
        .satisfies(value => Object.values(AddressType).indexOf(value) >= 0)
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
}

export class SocialProfile {

  type: SocialProfileType = SocialProfileType.GITHUB;
  username = '';

  constructor() {
    ValidationRules
      .ensure('type')
        .required()
        .satisfies(value => Object.values(SocialProfileType).indexOf(value) >= 0)
      .ensure('username')
        .required()
        .maxLength(100)
      .on(this);
  }

  static fromObject(src: SocialProfile) {
    return Object.assign(new SocialProfile, src);
  }
}


export class Contact implements ContactSrc {

  id: string;
  firstName = '';
  lastName = '';
  company = '';
  birthday = '';
  phoneNumbers: PhoneNumber[] = [];
  emailAddresses: EmailAddress[] = [];
  addresses: Address[] = [];
  socialProfiles: SocialProfile[] = [];
  note = '';

  constructor() {
    ValidationRules
      .ensure('firstName')
        .required()
        .maxLength(100)
      .ensure('lastName')
        .required()
        .maxLength(100)
      .ensure('company')
        .maxLength(100)
      .ensure('birthday')
        .satisfiesRule('date')
      .ensure('note')
        .maxLength(2000)
      .on(this);
  }

  static fromObject(src: ContactSrc): Contact {
    const contact = Object.assign(new Contact(), src);
    contact.phoneNumbers = contact.phoneNumbers.map(PhoneNumber.fromObject);
    contact.emailAddresses = contact.emailAddresses.map(EmailAddress.fromObject);
    contact.addresses = contact.addresses.map(Address.fromObject);
    contact.socialProfiles = contact.socialProfiles.map(SocialProfile.fromObject);

    return contact;
  }

  get isPerson(): boolean {
    return !!(this.firstName || this.lastName);
  }

  get fullName(): string {
    const fullName: string = this.isPerson
      ? `${this.firstName} ${this.lastName}`
      : this.company || '';

    return fullName;
  }

  get firstLetter(): string {
    const name: string  = this.lastName || this.firstName || this.company;
    return name ? name[0].toUpperCase() : '?';
  }

  addPhoneNumber(): void {
    this.phoneNumbers.push(new PhoneNumber());
  }

  addEmailAddress(): void {
    this.emailAddresses.push(new EmailAddress());
  }

  addAddress(): void {
    this.addresses.push(new Address());
  }

  addSocialProfile(): void {
    this.socialProfiles.push(new SocialProfile());
  }
}
