import {inject, DOM} from 'aurelia-framework';
import {log, cn} from '../logger';

interface FormElement extends Element {
  isSubmitTaskExecuting: boolean;
}

@inject(DOM.Element)
export class SubmitTaskCustomAttribute {

  /*
  * a function bound to the custom attribute's value to be called
  */
  value: () => Promise<void>;
  _trySubmit: (e: Event) => void;
  task: Promise<void> | null;

  constructor(private element: FormElement) {
    cn(this);
    this._trySubmit = this.trySubmit.bind(this);
   }

  attached() {
    this.element.addEventListener('submit', this._trySubmit);
    this.element.isSubmitTaskExecuting = false;
    log.debug('element:', this.element);
  }

  trySubmit(e: Event) {
    e.preventDefault();
    if (this.task) return;

    this.element.isSubmitTaskExecuting = true;
    this.task = Promise.resolve(this.value()).then(
      () => this.completeTask(),
      () => this.completeTask()
    );
  }

  completeTask() {
    this.task = null;
    this.element.isSubmitTaskExecuting = false;
  }

  detached() {
    this.element.removeEventListener('submit', this._trySubmit);
  }
}

