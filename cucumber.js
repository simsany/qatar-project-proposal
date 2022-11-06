module.exports = {
  default: [
    '--require-module ts-node/register',
   './test/features/*.feature',
    '--require test/step_definitions/*.ts',
  ].join(' '),
};
  