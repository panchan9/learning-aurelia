import {FrameworkConfiguration} from 'aurelia-framework';
import './rules';

export function configure(config: FrameworkConfiguration) {
  config.plugin('aurelia-validation');
}
