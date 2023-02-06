const data = require("./dataFormat");
const html = require("./htmlEscape");
module.exports = {
  ...data,
  ...html,
};
