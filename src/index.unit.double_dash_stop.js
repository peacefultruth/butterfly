import butterfly from '.';
describe('butterfly', () => {
  it('double dash stop', () => {
    const process_arguments = [
      'node',
      'entry.js',
      'blah',
      '3.14',
      'blahblahblah',
      '-3.14',
      'blahblahblahblah',
      '3.14asdflkjadsklfjasdf',
      'blahblah',
      '100',
      'adsfasdfsdafasdfajsdfjkla',
      'anotherstring',
      '--',
      'blahblahblah',
      '314',
    ];

    const descriptions = {
      blah: {
        type: Number,
        value: -1,
      },
      blahblah: {
        type: String,
        value: -1,
        is_multiple: true,
      },
      blahblahblah: {
        type: Number,
        value: -1,
      },
      blahblahblahblah: {
        type: Number,
        value: -1,
      },
    };

    const expected_output_first = {
      blah: {
        type: Number,
        value: 3.14,
      },
      blahblah: {
        type: String,
        is_multiple: true,
        value: ['100', 'adsfasdfsdafasdfajsdfjkla', 'anotherstring'],
      },
      blahblahblah: {
        type: Number,
        value: -3.14,
      },
      blahblahblahblah: {
        type: Number,
        value: NaN,
      },
      _: ['blahblahblah','314'],
    };

    const expected_output_second = {
      blah: {
        type: Number,
        value: -1,
      },
      blahblah: {
        type: String,
        value: -1,
        is_multiple: true,
      },
      blahblahblah: {
        type: Number,
        value: 314,
      },
      blahblahblahblah: {
        type: Number,
        value: -1,
      },
    };

    const output_first = butterfly(descriptions, process_arguments);
    expect(output_first).toEqual(
      expected_output_first
    );
    expect(butterfly(descriptions, output_first._, { not_process_argv: true })).toEqual(
      expected_output_second
    );
  });
});
