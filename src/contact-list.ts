import {autoinject} from 'aurelia-framework';
import {ContactGateway} from './contact-gateway';
import {Contact} from './models';
import {log, cn} from './resources/logger';

@autoinject
export class ContactList {

  private contacts: Contact[] = [];

  constructor(private gateway: ContactGateway) {}

  activate() {
    cn(this);
    return this.gateway.getAll()
      .then(contacts => {
        console.table(contacts);
        // empty the contacts Array
        this.contacts.splice(0);
        this.contacts.push.apply(this.contacts, contacts);
      });
  }
}

