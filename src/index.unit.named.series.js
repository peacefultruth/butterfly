import butterfly from '.';
describe('butterfly', () => {
  it('series of named values', () => {
    const process_arguments = [
      'node',
      'entry.js',
      'blah',
      'blahblah',
    ];

    const descriptions = {
      blah: {
        type: Boolean,
        value: false,
      },
      blahblah: {
        type: Boolean,
        value: false,
      },
    };

    const expected_output = {
      blah: {
        type: Boolean,
        value: true,
      },
      blahblah: {
        type: Boolean,
        value: true,
      },
    };

    expect(butterfly(descriptions, process_arguments)).toEqual(
      expected_output
    );
  });
});
