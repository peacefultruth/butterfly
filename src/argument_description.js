
const select_type = (description) => {
  if (description && description.type) {
    return description.type;
  } else {
    return Boolean;
  }
};

const select_arguments = (description) => {
  let the_arguments;
  if (description && description.arguments && Object.keys(description.arguments).length > 0) {
    the_arguments = description.arguments;
  }
  return the_arguments;
};

const select_is_multiple_lazy = (description) => {
  return !!(description && description.is_multiple_lazy);
};

const select_is_multiple = (description) => {
  return !!(description && description.is_multiple);
};

export default {
  keys: {
    arguments: 'arguments',
  },
  select: {
    type: select_type,
    arguments: select_arguments,
    is_multiple_lazy: select_is_multiple_lazy,
    is_multiple: select_is_multiple,
  },
  does_parsing_require_more_information: (description) => {
    const description_type = select_type(description);
    switch (description_type) {
    case Number:
      return true;
    case String:
      return true;

    case Boolean:
    default:
      return false;
    }
  },
  parse_value: (description, process_argument) => {
    const description_type = select_type(description);
    return description_type(process_argument);
  },
};
