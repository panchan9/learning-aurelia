import {log, cn} from '../logger';

type Criteria = string | number;

interface Group {
  [property: string]: Criteria;
}

export class OrderByValueConverter {
  toView(array: Group[], property: string, direction: string ='acs') {
    cn(this);
    log.debug('array: ', array, ', property: ', property);
    array = array.slice(0);
    const directionFactor = direction === 'desc' ? -1 : 1;

    array.sort((item1: Group, item2: Group) => {
      const value1 = item1[property];
      const value2 = item2[property];

      if (value1 > value2) return directionFactor;
      if (value1 < value2) return -directionFactor;
      return 0;
    });

    return array;
  }
}

