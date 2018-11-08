import butterfly from '.';
describe('butterfly', () => {
  it('undefined', () => {
    const previous_process_argv = global.process.argv;

    const process_arguments = [
      'node',
      'entry.js',
    ];

    global.process.argv = process_arguments;

    const descriptions = {
      blah: {
        type: Boolean,
        value: false,
      },
    };

    const expected_output = {
      blah: {
        type: Boolean,
        value: false,
      },
    };

    expect(butterfly(descriptions)).toEqual(
      expected_output
    );

    global.process.argv = previous_process_argv;
  });
});
