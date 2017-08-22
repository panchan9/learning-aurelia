import {log, cn} from '../logger';

type TargetItem = { [property: string]: string };

export interface Group {
  key: string;
  items: TargetItem[];
}

export class GroupByValueConverter {
  toView(array: TargetItem[], property: string): Group[] {
    cn(this);
    const groups = new Map();
    for (const item of array) {
      const key = item[property];
      log.debug('key: ', key);
      let group: Group = groups.get(key);

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

