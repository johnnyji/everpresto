import _ from 'lodash';
import replaceWordWithHtml from './replaceWordWithHtml';
import {richTextEditor, template} from '.././config/main';

const {placeholderTag: HIGHLIGHT_TAG} = template;
const {
  caretMarkerNode,
  caretMarkerNodeId: CARET_POSITION_MARKER_ID} = richTextEditor;
const HIGHLIGHT_TAG_MATCHER = new RegExp(`(<${HIGHLIGHT_TAG}>|<\/${HIGHLIGHT_TAG}>)`, 'g');
const CARET_POSITION_MARKER_MATCHER = new RegExp(`${caretMarkerNode}`, 'g');

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
   * Marks the current position of the caret by inserting a tag with a special ID as reference
   * @param  {DOM.Element} ele               - The content editable element we're marking the caret position of
   * @return {String}                        - The string with the caret marker injected so we know where the caret last was
   */
  markCurrentCaretPosition = (ele, text) => {
    // First removes any caret markers in the text and remove them
    let unmarkedText = text.replace(CARET_POSITION_MARKER_MATCHER, '');
    //Insert the new caret marker into the current caret position in the HTML element

    // THE ERROR: When the caret marker node is pasted at the caret,
    // the ele.innerHTML will have 2 caretMarkerNodes, 1 from previous, and the newly pasted one.
    // We cannot remove the previous one prior to pasting because it will actually alter the
    // element on the page, causing the caret to go haywire
    this.pasteHtmlAtCaret(caretMarkerNode);

    // Finds the index of the marker in the HTML element.
    
    // THE ERROR: Because we now have 2 caretMarkerNodes, it will always find the first one
    const currentCaretIndex = ele.innerHTML.indexOf(caretMarkerNode);
    console.log(currentCaretIndex);

    // Removes the marker as soon as the index is found.
    const domCaretMarkerNode = document.getElementById(CARET_POSITION_MARKER_ID);
    domCaretMarkerNode.parentNode.removeChild(domCaretMarkerNode);

    // THE ERROR: Because the currentCaretIndex is falsely portrayed as the previous caret index, the caret will be
    // infinitely stuck
    return unmarkedText.slice(0, currentCaretIndex) + caretMarkerNode + unmarkedText.slice(currentCaretIndex);
  };

  /**
   *  Places the caret directly after a specified node
   * @param  {DOM.Element} node - The DOM Node that we're placing the caret after
   */
  placeCaretAfterNode = (node) => {
    if (typeof window.getSelection != "undefined") {
      const range = document.createRange();
      range.setStartAfter(node);
      range.collapse(true);

      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
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
   * Pastes some HTML at the current caret position
   * @param  {String} html                 - The string of HTML to paste
   * @param  {Boolean} selectPastedContent - If the pasted content should be highlighted
   */
  pasteHtmlAtCaret = (html, selectPastedContent = false) => {
    let sel, range;
    if (window.getSelection) {
      // IE9 and non-IE
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();

        // Range.createContextualFragment() would be useful here but is
        // only relatively recently standardized and is not supported in
        // some browsers (IE9, for one)
        const el = document.createElement("div");
        el.innerHTML = html;
        let frag = document.createDocumentFragment(), node, lastNode;
        while ( (node = el.firstChild) ) {
            lastNode = frag.appendChild(node);
        }
        const firstNode = frag.firstChild;
        range.insertNode(frag);
        
        // Preserve the selection
        if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            if (selectPastedContent) {
                range.setStartBefore(firstNode);
            } else {
                range.collapse(true);
            }
            sel.removeAllRanges();
            sel.addRange(range);
        }
      }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        // IE < 9
        const originalRange = sel.createRange();
        originalRange.collapse(true);
        sel.createRange().pasteHTML(html);
        if (selectPastedContent) {
            range = sel.createRange();
            range.setEndPoint("StartToStart", originalRange);
            range.select();
        }
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
   * Remove the caret position marker node from the text if one does exist.
   * @param  {String} text               - The text we're parsing
   * @param  {String} caretMarkerMatcher - The marker node
   * @return {String}                    - The text with the caret marker removed
   */
  removeCaretPositionMarker = (text, caretMarkerMatcher = CARET_POSITION_MARKER_MATCHER) => {
    return text.replace(caretMarkerMatcher, '');
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