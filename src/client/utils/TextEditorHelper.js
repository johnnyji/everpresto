import _ from 'lodash';

const HIGHLIGHT_TAG = 'mark';
const HIGHLIGHT_CLASS = 'highlighted';

const TextEditorHelper = {

  /**
   * Goes through a string of text and highlights every unhighlighted word that matches the
   * words provided in the keywords list
   *
   * @param  {String} text             - The string of text we'll be parsing
   * @param  {Immutable.List} keywords - A list of words to highlight
   * @param  {String} className         - The class to apply to the highlighted text (default is `highlighted`)
   * @return {String}                  - The new string of text with every keyword highlighted
   */
  highlightText(text, keywords, className = HIGHLIGHT_CLASS) {
    return keywords.reduce((alteredText, placeholder) => {
      return this.replaceWordWithHtml(alteredText, placeholder, HIGHLIGHT_TAG, className, true);
    }, text);
  },


  /**
   * Places the caret at the very end of the text inside the given element
   *
   * @param  {[type]} el - The content editable element we're focusing on
   */
  placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);

      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
      const textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  },


  /**
   * Removes the highlighted tags from all instances of the words in the keyword list from the text
   *
   * @param  {String} text              - The string of text we'll be parsing
   * @param  {Immutable.List} keywords  - The list of keywords to unhighlight
   * @param  {String} className         - The class to apply to the highlighted text (default is `highlighted`)
   * @return {String}                   [description]
   */
  removeHighlights(text, keywords, className = HIGHLIGHT_CLASS) {
    return keywords.reduce((alteredText, keyword) => {
      const highlightedText = `<${HIGHLIGHT_TAG} class="${className}">${keyword}</${HIGHLIGHT_TAG}>`;
      return alteredText.replace(new RegExp(highlightedText, 'g'), keyword);
    }, text);
  },


  /**
   * Removes all zero width space charaters from the text
   *
   * @param  {String} text - The string of text that possibly contains zero width spaces
   * @return {String}      - The new string of text with all the zero width spaces removed
   */
  removeZeroWithSpace(text) {
    return text.replace(/\u200B/g, '');
  },


  /**
   * Wraps an HTML tag (with class) around every instance of word in a body of text. Word should be some
   * unique identifier such as `CASED_LIKE_THIS`, so we don't accidentally replace real HTML tags with that word.
   * 
   * @param  {String} text      - The body of text to scan
   * @param  {String} word      - The word we're converting to HTML
   * @param  {String} tag       - The HTML tag we will use
   * @param  {String} className - The class we will give the tag
   * @return {String}           - The newly altered text
   */
  replaceWordWithHtml(text, word, tag = 'span', className, isContentEditable = false) {
    const openingTag = Boolean(className) ? `<${tag} class="${className}">` : `<${tag}>`;
    const closingTag = `</${tag}>`;

    // JavaScript doesn't support negative lookbehinds... Of course.
    // const negativeLookbehind = `(?<!<${tag} class="${className}">)`;

    // Looks behind the word to make sure we don't match words already ending in the same HTML tag
    const negativeLookahead = `(?!${_.escapeRegExp(closingTag)})`;

    const matcher = new RegExp(`${_.escapeRegExp(word)}${negativeLookahead}`, 'g');
    // If this function is being used to replace words that will be used in a content editale field, we need to
    // add a unicode zero-width character,
    // refer to: http://stackoverflow.com/questions/21574522/contenteditable-put-caret-outside-inserted-span
    const htmlWord = isContentEditable
      ? `${openingTag}${word}${closingTag}\u200B`
      : `${openingTag}${word}${closingTag}`;

    return text.replace(matcher, (word, wordStartingIndex) => {
      // Note: This is the workaround for JavaScript's lack of a negative lookbehind...

      // Not possible the opening tag matches, there's not enough space for it, so we add the HTML tags.
      if (wordStartingIndex < openingTag.length) return htmlWord;

      const openingTagStartingIndex = wordStartingIndex - openingTag.length;
      const possibleOpeningTag = text.substring(openingTagStartingIndex, wordStartingIndex);

      return possibleOpeningTag === openingTag ? word : htmlWord;
    });
  }

};

export default TextEditorHelper;