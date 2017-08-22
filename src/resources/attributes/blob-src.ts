import {autoinject, PLATFORM} from 'aurelia-framework';
import {log, cn} from '../logger';

const URL = PLATFORM.global.URL;
const Blob = PLATFORM.global.Blob;

@autoinject
export class BlobSrcCustomAttribute {

  objectUrl: string;

  constructor(private element: Element) {
    cn(this);
    log.debug('Element', this.element);
  }

  disposeObjectUrl() {
    if (this.objectUrl && URL) {
      this.element.setAttribute('src', '');
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = '';
    }
  }

  valueChanged(newValue: Blob, oldValue: Blob) {
    log.debug('oldValue:', oldValue);
    log.debug('newValue:', newValue);
    log.debug('Blob', Blob);
    log.debug('URL', URL);
    log.debug('objectUrl', this.objectUrl);
    this.disposeObjectUrl();

    if (Blob && URL && newValue instanceof Blob) {
      this.objectUrl = URL.createObjectURL(newValue);
      this.element.setAttribute('src', this.objectUrl);
    }
  }

  unbind() {
    this.disposeObjectUrl();
  }
}

