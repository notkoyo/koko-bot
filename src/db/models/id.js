const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const idSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  channelId: {
    type: String,
    required: false,
  }
});

const ID = mongoose.model("ID", idSchema);

module.exports = ID;