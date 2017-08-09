import {log, cn} from '../logger';

interface StringMap {
  [index: string]: string;
}

export class GroupByValueConverter {
  toView(array: StringMap[], property: string) {
    cn(this);
    const groups = new Map();
    for (const item of array) {
      const key = item[property];
      log.debug('key: ', key);
      let group: { key: string, items: StringMap[] } = groups.get(key);

      if (!group) {
        group = { key, items: []};
        log.debug('A new group hsa created', group);
        groups.set(key, group);
      }
      group.items.push(item);
      log.debug('group: ', group);
    }
    return Array.from(groups.values());
  }

}

