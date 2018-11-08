import butterfly from '.';
describe('butterfly', () => {
  it('named values', () => {
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
    };

    const expected_output = {
      blah: {
        type: Boolean,
        value: true,
      },
    };

    expect(butterfly(descriptions, process_arguments)).toEqual(
      expected_output
    );
  });
});
