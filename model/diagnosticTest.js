const mongoose = require("mongoose");

const DiagnosticTestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const DiagnosticTest = mongoose.model("DiagnosticTest", DiagnosticTestSchema);

module.exports = DiagnosticTest;
