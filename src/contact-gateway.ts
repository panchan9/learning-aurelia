import {autoinject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Contact} from './models';
import environment from './environment';
import {log, cn} from './resources/logger';

@autoinject
export class ContactGateway {

  constructor(private httpClient: HttpClient) {
    cn(this);
    this.httpClient = httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(environment.contactsUrl);
    });
  }

  getAll() {
    return this.httpClient.fetch('contacts')
      .then(response => response.json())
      .then(dto => dto.map(Contact.fromObject));
  }

  getById(id: string) {
    log.debug('getById is called.');
    return this.httpClient.fetch(`contacts/${id}`)
      .then(response => response.json())
      .then(Contact.fromObject);
  }

  create(contact: Contact) {
    log.debug('contact:', contact);
    return this.httpClient.fetch('contacts',
      { method: 'POST', body: json(contact) });
  }

  update(id: string, contact: Contact) {
    return this.httpClient.fetch(`contacts/${id}`,
      { method: 'PUT', body: json(contact) });
  }

  updatePhoto(id: string, file: File) {
    cn(this);
    log.debug('file: ', file);
    return this.httpClient.fetch(`contacts/${id}/photo`, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file
    });
  }

  delete(id: string) {
    return this.httpClient.fetch(`contacts/${id}`, { method: 'DELETE' });
  }
}
