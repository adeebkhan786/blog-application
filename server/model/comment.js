import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    requred: true,
  },

  postId: {
    type: String,
    requred: true,
  },

  date: {
    type: Date,
    requred: true,
  },

  comments: {
    type: String,
    requred: true,
  },
});

const comment = mongoose.model('comment', commentSchema);
export default comment;