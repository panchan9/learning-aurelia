import {bindable, bindingMode, useShadowDOM} from 'aurelia-framework';

@useShadowDOM
export class FilePicker {

  @bindable inputId = '';
  @bindable accept = '';
  @bindable multiple = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) files: FileList;

}

