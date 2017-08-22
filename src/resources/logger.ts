import {LogManager} from 'aurelia-framework';
import {Logger} from 'aurelia-logging';

export const log: Logger = LogManager.getLogger('app');

export function cn(instance: any): void {
  if (!instance) {
    log.warn('this is not class instance');
  } else {
    log.info(`-*- ${instance.constructor.name} -*-`);
  }
}
