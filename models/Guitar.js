var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GuitarSchema = new Schema({
  brand: String,
  model: String,
  pickups: String,
  neck_construction: String,
});

var Guitar = mongoose.model('Guitar', CampsiteSchema);

module.exports = Guitar;
