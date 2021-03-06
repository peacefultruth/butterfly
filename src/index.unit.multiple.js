import butterfly from '.';
describe('butterfly', () => {
  it('multiple', () => {
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
      'anotherstring2',
      'blahblahblah',
      'anotherstring',
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

    const expected_output = {
      blah: {
        type: Number,
        value: 3.14,
      },
      blahblah: {
        type: String,
        is_multiple: true,
        value: ['100', 'adsfasdfsdafasdfajsdfjkla', 'anotherstring', 'anotherstring2', 'blahblahblah', 'anotherstring'],
      },
      blahblahblah: {
        type: Number,
        value: -3.14,
      },
      blahblahblahblah: {
        type: Number,
        value: NaN,
      },
    };

    expect(butterfly(descriptions, process_arguments)).toEqual(
      expected_output
    );
  });
});
