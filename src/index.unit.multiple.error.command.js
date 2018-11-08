import butterfly from '.';
describe('butterfly', () => {
  it('multiple error command', () => {
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
        arguments: {
          this_is_a_command: {
          },
        },
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

    expect(() => butterfly(descriptions, process_arguments)).toThrowError(
      butterfly.errors.command_and_multiple
    );
  });
});
