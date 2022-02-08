const { jsxBracketSameLine, ...cfg } = require('prettier-airbnb-config');
module.exports = {
  ...cfg,
  bracketSpacing: true,
  printWidth: 100,
};
