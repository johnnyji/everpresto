import hbs from 'handlebars-inline-precompile';

export default hbs`
  <div>
    <h1>Hello {{signer.firstName}} {{signer.lastName}}</h1>
    <p>I am {{sender.firstName}} {{sender.lastName}}</p>
    <div>
      <a href="{{signatureLink}}" target="_blank">Click here to sign the document!</a>
      <hr />
      <p>If the link is unclickable: You can go to this link:</p>
      <p>{{signatureLink}}</p>
    </div>
  </div> 
`;
