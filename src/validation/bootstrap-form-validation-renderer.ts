import {
  ValidationRenderer,
  RenderInstruction,
  ValidateResult
} from 'aurelia-validation';
import {log, cn} from '../resources/logger';

export class BootstrapFormValidationRenderer implements ValidationRenderer {

  render(instruction: RenderInstruction) {
    cn(this);
    log.debug('instruction.unrender: ', instruction.unrender);
    for (let { result, elements } of instruction.unrender) {
      for (let element of elements) {
        this.remove(element, result);
      }
    }

    log.debug('instruction.render: ', instruction.render);
    for (let { result, elements } of instruction.render) {
      for (let element of elements) {
        this.add(element, result);
      }
    }
  }

  add(element: Element, result: ValidateResult): void {
    const formGroup = element.closest('.form-group');
    if (!formGroup) return;

    log.debug('[add] element: ', element);
    log.debug('result: ', result.rule.messageKey, result.valid);
    if (result.valid) {
      if (!formGroup.classList.contains('has-error')) {
        formGroup.classList.add('has-success');
        log.warn('"has-success" is added in add method');
      }
    } else {
      formGroup.classList.remove('has-success');
      formGroup.classList.add('has-error');
      log.warn('"has-error" is added in add method');

      const message = document.createElement('span');
      message.className = 'help-block validation-message';
      message.textContent = result.message;
      message.id = `validation-message-${result.id}`;
      element.parentNode && element.parentNode.insertBefore(message, element.nextSibling);
      log.error(`error message #${result.id} is added.`);
    }
  }

  remove(element: Element, result: ValidateResult): void {
    const formGroup = element.closest('.form-group');
    if (!formGroup) return;

    log.debug('[remove] element: ', element);
    log.debug('result: ', result.rule.messageKey, result.valid);
    if (result.valid) {
      if (formGroup.classList.contains('has-success')) {
        formGroup.classList.remove('has-success');
        log.warn('"has-success" is removed in remove method');
      }
    } else {
      const message = formGroup.querySelector(`#validation-message-${result.id}`);
      if (message) {
        element.parentNode && element.parentNode.removeChild(message);
        log.error(`error message #${result.id} is removed.`);

        if (formGroup.querySelectorAll('.help-block.validation-message').length === 0) {
          formGroup.classList.remove('has-error');
          log.warn('"has-error" is removed in remove method');
        }
      }
    }
  }
}
