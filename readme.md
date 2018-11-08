# butterfly

process arguments from a data description.

just pass me the description of the process argv,
I will return you the parsed format.

```bash
yarn add @peacefultruth/butterfly
````

```js

import butterfly from '@peacefultruth/butterfly';

const process_arguments = (
  process.argv || (
    [
      'node',
      'entry.js',

      'blah',
      '3.14',
      '-b',
      '4.14',
      '--blah',
      '5.14',

      'blahblah',
      '100',
      '-bb',
      '200',
      '--blahblah',
      '300',
      '--blah-blah',
      '400',
    ]
  )
);

expect(
  butterfly(
    {
      blah: {
        aliases: ['-b', '--blah'],
        is_multiple_lazy: true,
        type: Number,
        value: -1,
      },
      blahblah: {
        aliases: ['-bb', '--blahblah', '--blah-blah'],
        is_multiple_lazy: true,
        type: Number,
        value: -1,
      },
    },
    process_arguments
  )
).toEqual(
  {
    blah: {
      aliases: ['-b', '--blah'],
      is_multiple_lazy: true,
      type: Number,
      value: [3.14, 4.14, 5.14],
    },
    blahblah: {
      aliases: ['-bb', '--blahblah', '--blah-blah'],
      is_multiple_lazy: true,
      type: Number,
      value: [100, 200, 300, 400],
    },
  }
)

````
