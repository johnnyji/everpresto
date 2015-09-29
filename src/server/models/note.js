import mongoose from 'mongoose';
import secrets from '../../.././secrets.json';

let NoteSchema = new mongoose.Schema({
  title: { type: String, default: 'Untitled' },
  description: String,
  attachmentUrls: Array,
  isPrivate: { type: Boolean, default: false },
  group: String,
  user: String,
  commentIds: Array
});

let Note = mongoose.model('Note', NoteSchema);

export default Note;