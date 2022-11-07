module.exports = {
  default: [
    "--require-module ts-node/register",
    "./test/features/*.feature",
    "--require test/step_definitions/*.ts",
    "--parallel 2",
    "--format progress-bar",
    "--format json:test/reports/cucumber-report.json",
    "--format html:test/reports/cucumber-report.html",
  ].join(" "),
};
