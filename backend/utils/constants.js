const pattern = '^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w.-]+)+[\\w\\-._~:/?#[\\]@!$&\'()*+,;=.]+$';
const urlRegExp = new RegExp(pattern);

module.exports = {
  urlRegExp,
};
