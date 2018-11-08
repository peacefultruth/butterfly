import butterfly from '.';
describe('butterfly', () => {
  it('number values', () => {
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
      '3.14asdflkjadsklfjasdf',
    ];

    const descriptions = {
      blah: {
        type: Number,
        value: -1,
      },
      blahblah: {
        type: Number,
        value: -1,
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
        type: Number,
        value: 100,
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
