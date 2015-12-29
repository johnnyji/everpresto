// Prefer single id ref as opposed to array in one to many, because updates are much easier to manage and only one model update is needed
// Use id refs whenever possible, only use sub-docs for very dumb bottom level documents
// Delete all associated documents in the `pre` hook when deleting a document
// `id` is the string representation of `_id` from a model

// TODO: Implement subscription feature

{
  company: {
    // _collections: [Array, 'ObjectIds of the collections that belong to this company'],
    // _documents: [Array, 'ObjectIds of documents that belong to the company'],
    // _templates: [Array, 'ObjectIds of templates that belong to the company'],
    // _users: [Array, 'Array of ObjectIds of users that belong to the company'],
    name: [String, 'The name of the company']
  }
}

{
  collections: [{
    _company: [ObjectId, 'The ObjectId of the company this collection belongs to'],
    _creator: [ObjectId, 'The ObjectId of the user that created this collection'],
    documents: [Array, 'This is a list of ObjectIds of the documents that belong in the collection']
    title: [String, 'The title of the collection']
  }],
}

// Documents belong to the user, the company and a collection
{
  documents: [{
    _company: [ObjectId, 'The ObjectId of the company this collection belongs to'],
    _creator: [ObjectId, 'id of the user that created this document'],
    // _subscribedUsers: [Array, 'ObjectIds of users that are subscribed to this document'],
    body: [String, 'The html text of the document'],
    expiresAt: [Date, 'The date when this document expires'],
    note: [String, 'A note left on the document for the signee'],
    signature,
    signedAt
  }],
}

{
  templates: [{
    _company: [ObjectId, 'The ObjectId of the company this collection belongs to'],
    _creator: [ObjectId, 'The ObjectId of the user that created this template'],
    // _subscribedUsers: [Array, 'ObjectIds of users that are subscribed to this template'],
    body: [String, 'The html text of the template'],
    editors: [Array, 'ObjectIds of users that can edit this template'],
    placeholders: [Array, 'An array of placeholders to be replaced when this template is used'],
    rawText: [String, 'The html free text of the template'],
    title: [String, 'The title of the template']
  }]
}

// The user exists as it's own collection so a user can be authenticated
{
  users: [{
    _company: [ObjectId, 'The ObjectId of the company this collection belongs to'],
    // _documentSubscriptions: [Array, 'ObjectIds of documents that this user is subscribed to'],
    // _templateSubscriptions: [Array, 'ObjectIds of templates that this user is subscribed to']
    clearanceLevel: [Enum, 'user, admin'],
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