// One - N Relationships
// - Use sub-docs if it's one - a few records (usually under 1000)
// - Use an array of ObjectId refs if it's one - many (usually under 100,000), This allows us to keep track of the associated objects without querying them all at once 

{
  company: {
    collections: [{
      _creator: [ObjectId, 'The ObjectId of the user that created this collection'],
      documents: [Array, 'This is a list of ObjectIds of the documents that belong in the collection']
      title: [String, 'The title of the collection']
    }],
    documents: [Array, 'ObjectIds of documents that belong to the company'],
    templates: [{
      _creator: [ObjectId, 'The ObjectId of the user that created this template'],
      body: [String, 'The html text of the template'],
      editors: [Array, 'ObjectIds of users that can edit this template'],
      placeholders: [Array, 'An array of placeholders to be replaced when this template is used'],
      rawText: [String, 'The html free text of the template'],
      subscribedUsers: [Array, 'ObjectIds of users that are subscribed to this template'],
      title: [String, 'The title of the template']
    }],
    users: [Array, 'Array of ObjectIds of users that belong to the company'],
    name: [String, 'The name of the company']
  }
}

// The user exists as it's own collection so a user can be authenticated
{
  users: [{
    clearanceLevel: [Enum, 'user, admin'],
    documentSubscriptions: [Array, 'ObjectIds of documents that this user is subscribed to'],
    templateSubscriptions: [Array, 'ObjectIds of templates that this user is subscribed to']
    account: {
      email: [String, 'The users email'],
      firstName: [String, 'The users first name'],
      hash: [Object, 'The users password hash'],
      lastName: [String, 'The users last name'],
      password: [String, 'The users raw password'],
      profilePictureUrl: [String, 'The url to the users profile picture']
    },
  }]
}


// Documents belong to the user, the company and a collection
{
  documents: [{
    _creator: [ObjectId, 'id of the user that created this document'],
    body: [String, 'The html text of the document'],
    expiryDate: [Date, 'The date when this document expires'],
    note: [String, 'A note left on the document for the signee'],
    signature,
    signedAt,
    subscribedUsers: [Array, 'ObjectIds of users that are subscribed to this document']
  }],
}