let printComment = false;
let groupName = '';

/**
 * Generates a group name comment if the token group's parent name changes.
 *
 * @param {TokenGroup} tokenGroup - The token group to generate a comment for.
 * @returns {string} The generated group name comment.
 */
const groupNameComment = (tokenGroup: TokenGroup): string => {
  if (!tokenGroup.parent) {
    return '';
  }

  const { parent: { name } } = tokenGroup;

  if (name !== groupName) {
    groupName = name;
    printComment = true;
  } else {
    printComment = false;
  }

  return printComment
    ? `

  /* --- ${groupName} --- */
` : '';
};

export default groupNameComment;
