var db = require('./models');

var new_guitar = {
                  brand: "Fender",
                  model: "Telecaster",
                  pickups: "lil' 59 - Bridge, Stock - Neck",
                  neck_construction: "Bolt-on"
                };
  db.Guitar.remove({}, function(err, books){
    if(err) {
      console.log('Error occurred in remove', err);
    } else {
      console.log('removed all books');

      // create new records based on the array books_list
      db.Guitar.create(new_guitar, function(err, guitar){
        if (err) { return console.log('err', err); }
        console.log("created a new guitar with id: ", guitar.id);
        process.exit();
      });
    }
  });
