// Global App Code Config for Everpresto

module.exports = {
  collection: {
    defaultTitle: 'Untitled'
  },
  doc: {
    placeholderClasses: {
      specific: 'everpresto-specific-placeholder',
      general: 'everpresto-general-placeholder'
    }
  },
  template: {
    hintBody: "<p>Hello <mark>FIRST_NAME</mark>!</p><p><br></p><p>This is a quick tutorial on how to make a template. If you already know your stuff, feel free to just highlight all this text and delete it.</p><p><br></p><p>Over to the <i>right</i> is where your <b>placeholders</b> are. Once you've defined placeholders, you can use them in your template like so: <mark>LAST_NAME</mark>.</p><p><br></p><p><mark>EMAIL</mark>, <mark>FIRST_NAME</mark>, and <mark>LAST_NAME</mark>,&nbsp;amongst other placeholders will be replaced with actual values when you use this template.</p><p><br></p><p>Feel free to add your own placeholders!</p><p><br></p><p><br></p><p><u>You can also <b>format text</b></u>&nbsp;<i>however you want</i><b>. </b>In order to format text simply select the text and a handy formatting tool will pop up!</p><p><br></p><ul><li>You can do stuff like make lists<br></li><li>Bold</li><li>Underline</li><li>Quote</li><li>You get the idea ;)</li></ul><p><br></p><p><br></p><p>Lastly, no need to manually add a signature field. We'll do that for you when you use this template.</p><p><br></p><p><br></p><p>Alright <mark>FIRST_NAME</mark>, you're all set<span>﻿</span>!</p>",
    placeholderTag: 'mark'
  }
};
