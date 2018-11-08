import butterfly from '.';
describe('butterfly', () => {
  it('command', () => {
    const process_arguments = [
      'node',
      'entry.js',
      'blah',
      '3.14',
      'blahblah',
      '100',
      'thoushaltnot',
      'failthistest',
      '6.66',
      'orfailthistesteither',
    ];

    const descriptions = {
      blah: {
        type: Number,
        value: -1,
      },
      blahblah: {
        type: String,
        value: -1,
      },
      thoushaltnot: {
        arguments: {
          failthistest: {
            type: Number,
            value: -1,
          },
          orfailthistesteither: {
          },
        },
      },
    };

    const expected_output = {
      blah: {
        type: Number,
        value: 3.14,
      },
      blahblah: {
        type: String,
        value: '100',
      },
      thoushaltnot: {
        arguments: {
          failthistest: {
            type: Number,
            value: 6.66,
          },
          orfailthistesteither: {
            type: Boolean,
            value: true,
          },
        },
        type: Boolean,
        value: true,
      },
    };

    expect(butterfly(descriptions, process_arguments)).toEqual(
      expected_output
    );
  });
});
