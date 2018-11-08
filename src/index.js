import object_path from 'object-path';
import deepcopy from 'deepcopy';
import deepmerge from 'deepmerge';

import argument_description from './argument_description';
import arguments_description from './arguments_description';
import command_stack from './command_stack';
import argument_tree from './argument_tree';

const errors = {
  command_and_multiple: 'Unable to parse a command which is also multiple.',
};

const reserved = {
  double_dash: '--',
};

const butterfly = (descriptions_original = {}, process_arguments = process.argv, { double_dash_stop = true, not_process_argv = false } = {}) => {
  if (!process_arguments) {
    process_arguments = [];
  }
  process_arguments = deepcopy(process_arguments);
  const is_process_argv = !not_process_argv;
  if (is_process_argv) {
    process_arguments.shift();
    process_arguments.shift();
  }

  const descriptions = deepcopy(descriptions_original);
  let arguments_ = new arguments_description(descriptions);
  const commands = new command_stack();
  let output = new argument_tree();
  let index = 0;
  let break_index = -1;
  let await_value_for_this_description;
  for (const process_argument of process_arguments) {
    if (double_dash_stop && process_argument === reserved.double_dash) {
      break_index = index;
      break;
    }

    let description_to_set;
    if (await_value_for_this_description) {
      description_to_set = await_value_for_this_description;
      if (!argument_description.select.is_multiple(description_to_set)) {
        await_value_for_this_description = undefined;
      }
    } else {
      description_to_set = arguments_.best_match(process_argument);
      if (argument_description.does_parsing_require_more_information(description_to_set)) {
        await_value_for_this_description = description_to_set;
      }
    }

    if (description_to_set) {
      const place_at = commands.where_to_place(
        description_to_set.key
      );
      output.set(place_at, object_path.get(descriptions, place_at), process_argument);
    }

    const descriptions_arguments = argument_description.select.arguments(description_to_set);
    const is_this_describing_a_command = !!descriptions_arguments;
    if (is_this_describing_a_command) {
      if (argument_description.select.is_multiple(description_to_set)) {
        throw new Error(errors.command_and_multiple);
      }
      arguments_ = new arguments_description(descriptions_arguments);
      commands.push(description_to_set.key);
    }

    index++;
  }

  const output_values_parsed = output.map((value) => {
    if (argument_description.select.is_multiple(value)) {
      value.value.shift();
      const values = value
        .value
        .map((single) => argument_description.parse_value(value, single));

      const output = ({
        type: argument_description.select.type(value),
        value: values,
      });

      return output;
    } else if (argument_description.select.is_multiple_lazy(value)) {
      const values = value
        .value
        .reduce((accumulator, value, index) => {
          if (index % 2 === 1) {
            accumulator.push(value);
          }
          return accumulator;
        }, [])
        .map((single) => argument_description.parse_value(value, single));

      const output = ({
        type: argument_description.select.type(value),
        value: values,
      });

      const arguments_ = argument_description.select.arguments(value);
      if (arguments_) {
        output.arguments = arguments_;
      }

      return output;
    } else {
      const value_unboxed = value.value.pop();

      const output = ({
        type: argument_description.select.type(value),
        value: argument_description.parse_value(value, value_unboxed),
      });

      const arguments_ = argument_description.select.arguments(value);
      if (arguments_) {
        output.arguments = arguments_;
      }

      return output;
    }
  });

  const output_remerged = deepmerge(deepcopy(descriptions_original), output_values_parsed.value);

  if (break_index > -1) {
    output_remerged._ = process_arguments.slice(break_index+1);
  }

  return output_remerged;
};

export default Object.assign(butterfly, { errors });
