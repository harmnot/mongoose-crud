const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const member_schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  zipcode: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email`
    }
  },
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return v.length <= 11 || v.length >= 13;
      },
      message: props =>
        `${props.value} must be more than 11 digits and less than 13 disgits`
    }
  }
});

const Member = mongoose.model("Member", member_schema);

module.exports = Member;
