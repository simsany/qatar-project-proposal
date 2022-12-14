module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    paths: ["./test/features/*.feature"],
    require: ["test/step_definitions/*.ts"],
    parallel: 2,
    format: ["progress-bar", "json:test/reports/json-test-report.json", "html:test/reports/html-test-report.html"]
  }
};