export default ({stylePath, scriptPath, content, initialState}) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Reducing document signing time">
        <meta name="author" content="everpresto">
        <title>everpresto!</title>
        <link rel="stylesheet" type="text/css" href="${stylePath}" />
        ${initialState ? initialState : ''}
      </head>
      <body>
        <div id="app">${content}</div>
        <script src="/socket.io/socket.io.js"></script>
        <script type="application/javascript" src="${scriptPath}"></script>
      </body>
    </html>
  `;
};
