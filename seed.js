var db = require('./models');

var new_guitars = [{
                  brand: "Fender",
                  model: "Telecaster",
                  pickups: "lil' 59 - Bridge, Stock - Neck",
                  neck_construction: "Bolt-on"
                },
                {
                  brand: "Jackson",
                  model: "Stratocaster",
                  pickups: "Jackson Noiseless",
                  neck_construction: "Bolt-on"
                }
              ];

  var otherGuitar  = {
    brand: "Schecter",
    model: "C1-EA",
    pickups: "PAF clones",
    neck_construction: "Set"
  };
  db.Guitar.remove({}, function(err, books){
    if(err) {
      console.log('Error occurred in remove', err);
    } else {
      console.log('removed all books');

      // create new records based on the array books_list
      db.Guitar.create(new_guitars, function(err, guitar){
        if (err) { return console.log('err', err); }
        console.log("created a new guitar with id: ", guitar.id);
        process.exit();
      });

      db.Guitar.create(otherGuitar, function(err, guitar){
        if (err) { return console.log('err', err); }
        console.log("created a new guitar with id: ", guitar.id);
        process.exit();
      });
    }
  });
