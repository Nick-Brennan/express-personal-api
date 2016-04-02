var db = require('./models');

var new_guitar = {
                  brand: "Fender",
                  model: "Telecaster",
                  pickups: "lil' 59 - Bridge, Stock - Neck",
                  neck_construction: "Bolt-on"
                }

db.Guitar.create(new_guitar, function(err, guitar){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new guitar", guitar_id)
  process.exit(); // we're all done! Exit the program.
})
