export default class arguments_description {
  constructor(descriptions) {
    this.descriptions = descriptions;
    this.descriptions_keys = Object
      .keys(this.descriptions)
      .map(key => ([
        ...[key],
        ...(descriptions[key].aliases || [])
      ]));
  }
  best_match = (process_argument) => {
    let description_key;
    this.descriptions_keys.forEach((keys) => {
      if (!description_key && keys.some(key => key === process_argument)) {
        description_key = keys[0];
      }
    });

    let description;
    if (description_key) {
      description = this.descriptions[description_key];
      description.key = description_key;
    }
    return description;
  }
}