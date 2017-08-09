import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    './value-converters/order-by',
    './value-converters/group-by',
    './value-converters/filter-by',
  ]);
}
