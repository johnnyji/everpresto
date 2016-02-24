import _ from 'lodash';
import replaceWordWithHtml from './replaceWordWithHtml';
import config from '.././config/main';

const {placeholderTag: HIGHLIGHT_TAG} = config.template;
const HIGHLIGHT_TAG_MATCHER = new RegExp(`(<${HIGHLIGHT_TAG}>|<\/${HIGHLIGHT_TAG}>)`, 'g');

class TextEditorHelper {


  /**
   * Goes through a string of text and highlights every unhighlighted word that matches the
   * words provided in the keywords list
   * @param  {String} text             - The string of text we'll be parsing
   * @param  {Immutable.List} keywords - A list of words to highlight
   * @return {String}                  - The new string of text with every keyword highlighted
   */
  highlightText = (text, keywords) => {
    return keywords.reduce((alteredText, placeholder) => {
      return replaceWordWithHtml(alteredText, placeholder, HIGHLIGHT_TAG, null, true);
    }, text);
  };

  /**
   * Places the caret at the very end of the text inside the given element
   * @param  {[type]} el - The content editable element we're focusing on
   */
  placeCaretAtEnd = (el) => {
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
  };


  /**
   * Removes all traces of the highlight tag from the text
   * @param  {String} text              - The string of text we'll be parsing
   * @return {String}                   - The new text with highlight tags removed
   */
  removeHighlights = (text) => {
    return text.replace(HIGHLIGHT_TAG_MATCHER, '');
  };


  /**
   * Removes all zero width space charaters from the text
   * @param  {String} text - The string of text that possibly contains zero width spaces
   * @return {String}      - The new string of text with all the zero width spaces removed
   */
  removeZeroWidthSpace = (text) => {
    return text.replace(/\u200B/g, '').replace(/\u0001/g, '');
  };

};

export default new TextEditorHelper();