import _ from 'lodash';
import Config from '.././config/main';

const {template, richTextEditor} = Config;

const HIGHLIGHT_TAG = template.placeholderTag;
const HIGHLIGHT_CLASS = template.placeholderClass;
const CARET_POSITION_MARKER_MATCHER = new RegExp(richTextEditor.caretMarkerNode);

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
   * Marks the current position of the caret by inserting a tag with a special ID as reference
   *
   * @param  {DOM.Element} ele               - The content editable element we're marking the caret position of
   * @param  {DOM.Element} caretIndexFinder  - The invisible DOM element that we insert to temporarily mark the caret position
   * @param  {String} caretMarkerNode        - The DOM node we'll inject into our HTML string as a placeholder for
   *                                           where the caret is
   * @param  {RegExp} caretMarkerNodeMatcher - The Regex of the `caretMarkerNode`, so we can match and remove the
   *                                           previous marker if there is one in the HTML string
   * @return {String}                        - The string with the caret marker injected so we know where the caret last was
   */
  markCurrentCaretPosition(ele, text, caretIndexFinder, caretMarkerNode, caretMarkerNodeMatcher) {
    //Inserts the caret marker into the current caret position
    document.getSelection().getRangeAt(0).insertNode(caretIndexFinder);
    // Finds the index of the marker in the HTML String.
    const currentCaretPosition = ele.innerHTML.indexOf('\u0001');
    // Removes the marker as soon as the index is found.
    caretIndexFinder.parentNode.removeChild(caretIndexFinder);
    // Removes the previous marker from the text if there is one, and adds a new marker where the caret is.
    let caretMarkedText = text.replace(caretMarkerNodeMatcher, '');
    return caretMarkedText.slice(0, currentCaretPosition) + caretMarkerNode + caretMarkedText.slice(currentCaretPosition);
  },


  /**
   *  Places the caret directly after a specified node
   *
   * @param  {DOM.Element} node - The DOM Node that we're placing the caret after
   */
  placeCaretAfterNode(node) {
    if (typeof window.getSelection != "undefined") {
      const range = document.createRange();
      range.setStartAfter(node);
      range.collapse(true);

      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
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
   * Remove the caret position marker node from the text if one does exist.
   *
   * @param  {String} text               - The text we're parsing
   * @param  {String} caretMarkerMatcher - The marker node
   * @return {String}                    - The text with the caret marker removed
   */
  removeCaretPositionMarker(text, caretMarkerMatcher = CARET_POSITION_MARKER_MATCHER) {
    return text.replace(caretMarkerMatcher, '');
  },


  /**
   * Removes all zero width space charaters from the text
   *
   * @param  {String} text - The string of text that possibly contains zero width spaces
   * @return {String}      - The new string of text with all the zero width spaces removed
   */
  removeZeroWidthSpace(text) {
    return text.replace(/\u200B/g, '').replace(/\u0001/g, '');
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