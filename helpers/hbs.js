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

const editIcon = (storyUser, loggedUser, storyId, floating = true) => {
  if (storyUser?._id.toString() == loggedUser?._id.toString()) {
    if (!floating) {
      return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`;
    }
    return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
  }
};

module.exports = { formatDate, truncate, stripTags, editIcon };
