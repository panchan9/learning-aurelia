import {autoinject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Contact} from './models';
import environment from './environment';

@autoinject
export class ContactGateway {

  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(environment.contactsUrl);
    });
  }

  getAll() {
    console.debug(this.httpClient);
    return this.httpClient.fetch('contacts')
      .then(response => response.json())
      .then(dto => dto.map(Contact.fromObject));
  }

  getById(id: string) {
    return this.httpClient.fetch(`contacts/${id}`)
      .then(response => response.json())
      .then(Contact.fromObject);
  }

  create(contact: Contact) {
    return this.httpClient.fetch('contacts',
      { method: 'POST', body: json(contact) });
  }

  update(id: string, contact: Contact) {
    return this.httpClient.fetch(`contacts/${id}`,
      { method: 'PUT', body: json(contact) });
  }
}
