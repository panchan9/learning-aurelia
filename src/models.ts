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

enum SocialProfileType {
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

  static fromObject(src: PhoneNumber): PhoneNumber {
    return Object.assign(new PhoneNumber(), src);
  }
}

export class EmailAddress {

  type: EmailAddressType = EmailAddressType.HOME;
  address = '';

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

  static fromObject(src: Address) {
    return Object.assign(new Address, src);
  }
}

export class SocialProfile {

  type: SocialProfileType = SocialProfileType.GITHUB;
  username = '';

  static fromObject(src: SocialProfile) {
    return Object.assign(new SocialProfile, src);
  }
}


export class Contact implements ContactSrc {

  id = '';
  firstName = '';
  lastName = '';
  company = '';
  birthday = '';
  phoneNumbers: PhoneNumber[] = [];
  emailAddresses: EmailAddress[] = [];
  addresses: Address[] = [];
  socialProfiles: SocialProfile[] = [];
  note = '';

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
