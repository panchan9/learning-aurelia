import {autoinject, bindable} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';

@autoinject
export class LocalePickerCustomElement {

  @bindable private selectedLocale: string;
  @bindable private locales = ['en', 'ja', 'fr'];
  private isChangingLocale = false;

  constructor(private i18n: I18N) {
    this.selectedLocale = 'ja';
    // this.selectedLocale = this.i18n.getLocale();
  }

  private selectedLocaleChanged() {
    this.isChangingLocale = true;
    this.i18n.setLocale(this.selectedLocale).then(() => {
      this.isChangingLocale = false;
    });
  }
}
