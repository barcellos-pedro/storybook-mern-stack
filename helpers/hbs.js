/**
 * Formate date to lacale
 *
 * Example: 9/10/2022, 6:56:32 PM (pt-BR)
 */
const formatDate = (date) => new Date(date).toLocaleString();

/**
 * Return shorter text
 */
const truncate = (text, size) => {
  if (text.length < size) {
    return text;
  }
  return `${text.substr(0, size)}...`;
};

/**
 * Remove html tags from content
 */
const stripTags = (input) => {
  return input.replace(/<(?:.|\n)*?>/gm, '');
};

module.exports = { formatDate, truncate, stripTags };
