import butterfly from '.';
describe('butterfly', () => {
  it('undefined all', () => {
    const previous_process_argv = global.process.argv;

    const process_arguments = undefined;

    global.process.argv = process_arguments;

    const expected_output = {
    };

    expect(butterfly()).toEqual(
      expected_output
    );

    global.process.argv = previous_process_argv;
  });
});
