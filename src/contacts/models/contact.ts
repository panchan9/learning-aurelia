import {ValidationRules} from 'aurelia-validation';
import {PhoneNumber} from './phone-number';
import {EmailAddress} from './email-address';
import {Address} from './address';
import {SocialProfile} from './social-profile';

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

  toString(): string {
    return this.fullName;
  }
}
