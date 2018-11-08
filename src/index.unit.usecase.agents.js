import butterfly from '.';
describe('butterfly', () => {
  it('usecase agents', () => {
    const process_argv = [
      'node',
      'entry.js',
      'name',
      'testbench',
      '--',
      '--my-number',
      '3.14',
    ];
    const descriptions = {
      name: {
        type: String,
      },
    };
    const descriptions_second = {
      my_number: {
        aliases: ['--my-number'],
        type: Number,
      },
    };
    const expected_output_first = {
      name: {
        type: String,
        value: 'testbench',
      },
      _: ['--my-number', '3.14'],
    };
    const expected_output_second = {
      my_number: {
        aliases: ['--my-number'],
        type: Number,
        value: 3.14,
      },
    };
    const output_first = butterfly(descriptions, process_argv);
    expect(output_first).toEqual(
      expected_output_first
    );
    expect(butterfly(descriptions_second, output_first._, { not_process_argv: true })).toEqual(
      expected_output_second
    );
  });
});
