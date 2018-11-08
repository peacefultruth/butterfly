import butterfly from '.';
describe('butterfly', () => {
  it('alias number values', () => {
    const process_arguments = [
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

      'blahblahblah',
      '-3.14',
      '-bbb',
      '-4.14',
      '--blahblahblah',
      '-5.14',
      '--blah-blah-blah',
      '-6.14',

      'blahblahblahblah',
      '3.14asdflkjadsklfjasdf',
      '-bbbb',
      '4.14asdflkjadsklfjasdf',
      '--blahblahblahblah',
      '5.14asdflkjadsklfjasdf',
      '--blah-blah-blah-blah',
      '6.14asdflkjadsklfjasdf',
    ];

    const descriptions = {
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
      blahblahblah: {
        aliases: ['-bbb', '--blahblahblah', '--blah-blah-blah'],
        is_multiple_lazy: true,
        type: Number,
        value: -1,
      },
      blahblahblahblah: {
        aliases: ['-bbbb', '--blahblahblahblah', '--blah-blah-blah-blah'],
        is_multiple_lazy: true,
        type: Number,
        value: -1,
      },
    };

    const expected_output = {
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
      blahblahblah: {
        aliases: ['-bbb', '--blahblahblah', '--blah-blah-blah'],
        is_multiple_lazy: true,
        type: Number,
        value: [-3.14, -4.14, -5.14, -6.14],
      },
      blahblahblahblah: {
        aliases: ['-bbbb', '--blahblahblahblah', '--blah-blah-blah-blah'],
        is_multiple_lazy: true,
        type: Number,
        value: [NaN, NaN, NaN, NaN],
      },
    };

    expect(butterfly(descriptions, process_arguments)).toEqual(
      expected_output
    );
  });
});
