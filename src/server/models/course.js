import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const defaultBannerUrl = 'http://someamazonurl.com';

const CourseSchema = new Schema({
  _teacher: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  students: [{type: Schema.Types.ObjectId, ref: 'User'}],
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
  bannerUrl: {type: String, default: defaultBannerUrl},
  pictureUrls: Array,
  title: {type: String, required: true},
  description: {type: String, required: true}
}, {timestamps: true});

export default mongoose.model('Course', CourseSchema);