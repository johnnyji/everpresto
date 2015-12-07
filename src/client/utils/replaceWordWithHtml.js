import _ from 'lodash';
import requiredArgs from '.././decorators/requiredArgs';

/**
 * Wraps an HTML tag (with class) around every instance of word in a body of text.
 * 
 * @param  {String} text      - The body of text to scan
 * @param  {String} word      - The word we're converting to HTML
 * @param  {String} tag       - The HTML tag we will use
 * @param  {String} className - The class we will give the tag
 * @return {String}           - The newly altered text
 */
// @requiredArgs
export default function replaceWordWithHtml(text, word, tag = 'span', className) {
  const openingTag = Boolean(className) ? `<${tag} class="${className}">` : `<${tag}>`;
  const closingTag = `</${tag}>`;

  // JavaScript doesn't support negative lookbehinds... Of course.
  // const negativeLookbehind = `(?<!<${tag} class="${className}">)`;

  // Looks behind the word to make sure we don't match words already ending in the same HTML tag
  const negativeLookahead = `(?!${_.escapeRegExp(closingTag)})`;

  const matcher = new RegExp(`${_.escapeRegExp(word)}${negativeLookahead}`, 'g');
  const htmlWord = `${openingTag}${word}${closingTag}`;

  return text.replace(matcher, (word, wordStartingIndex) => {
    // Note: This is the workaround for JavaScript's lack of a negative lookbehind...

    // Not possible the opening tag matches, there's not enough space for it, so we add the HTML tags.
    if (wordStartingIndex < openingTag.length) return htmlWord;

    const openingTagStartingIndex = wordStartingIndex - openingTag.length;
    const possibleOpeningTag = text.substring(openingTagStartingIndex, wordStartingIndex);

    return possibleOpeningTag === openingTag ? word : htmlWord;
  });
}