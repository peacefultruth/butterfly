import butterfly from '.';
describe('butterfly', () => {
  it('multiple lazy edge command', () => {
    const process_arguments = [
      'node',
      'entry.js',
      'blah',
      '3.14',
      'blahblah',
      '100',
      'blahblahblah',
      '-3.14',
      'blahblahblahblah',
      'blahblah',
      'adsfasdfsdafasdfajsdfjkla',
      'blahblah',
      'anotherstring',
      'blahblah',
      'anotherstring2',
      'blahblah',
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
        is_multiple_lazy: true,
      },
      blahblahblah: {
        arguments: {
          this_is_a_command: {
          },
        },
        is_multiple_lazy: true,
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
        is_multiple_lazy: true,
        value: ['100'],
      },
      blahblahblah: {
        arguments: {
          this_is_a_command: {
          },
        },
        is_multiple_lazy: true,
        type: Boolean,
        value: [],
      },
      blahblahblahblah: {
        type: Number,
        value: -1,
      },
    };

    expect(butterfly(descriptions, process_arguments)).toEqual(
      expected_output
    );
  });
});
