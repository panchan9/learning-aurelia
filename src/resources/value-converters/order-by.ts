import {log, cn} from '../logger';

type Criteria = string | number;

interface StringMap {
  [index: string]: Criteria;
}

export class OrderByValueConverter {
  toView(array: StringMap[], property: string, direction: string ='acs') {
    cn(this);
    log.debug('array: ', array, ', property: ', property);
    array = array.slice(0);
    const directionFactor = direction === 'desc' ? -1 : 1;

    array.sort((item1: StringMap, item2: StringMap): number => {
      const value1: Criteria = item1[property];
      const value2: Criteria = item2[property];

      if (value1 > value2) return directionFactor;
      if (value1 < value2) return -directionFactor;
      return 0;
    });

    return array;
  }
}

