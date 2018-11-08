
export default class command_stack {
  constructor() {
    this.value = [];
  }
  push = (this_key_on_top) => {
    this.value = [
      ...this.value,
      ...[this_key_on_top, 'arguments'],
    ];
  }
  where_to_place = (this_key_on_top) => {
    return command_stack.build([
      ...this.value,
      ...[this_key_on_top],
    ]);
  }
  static build = (command_stack_value) => {
    let output = '';
    command_stack_value.forEach((command, index) => {
      if (index > 0) {
        output = `${output}.${command}`;
      } else {
        output = `${command}`;
      }
    });
    return output;
  }
}
