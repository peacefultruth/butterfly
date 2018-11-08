import object_path from 'object-path';
import traverse from 'traverse';

import argument_description from './argument_description';

export default class argument_tree {
  constructor(value = {}) {
    this.value = value;
  }
  set = (at, what, what_value) => {
    object_path.set(
      this.value,
      at,
      what
    );
    object_path.push(
      this.value,
      `${at}.value`,
      what_value,
    );
  }
  map = (cb) => {
    return new argument_tree(traverse(this.value).map(function (value) {
      if (this.notLeaf && this.notRoot && typeof value === 'object' && !Array.isArray(value) && this.key !== argument_description.keys.arguments) {
        return cb(value);
      }
      return value;
    }));
  }
}
