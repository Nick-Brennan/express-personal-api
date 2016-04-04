// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

/************
 * DATABASE *
 ************/

 //hardcoded profile data
 var me = {
   name: "Nick Brennan",
   github_link: "https://github.com/Nick-Brennan",
   github_profile_image: "https://avatars0.githubusercontent.com/u/13402059?v=3&s=460",
   current_city: 'Mill Valley'
 }

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/profile', function profile(req, res){
  res.json(me);
});

app.get('/guitars', function index(req, res){
  db.Guitar.find({}, function(err, guitars){
    res.send(guitars);
  });
});

app.get('/guitars/:id', function show(req, res){
  db.Guitar.findById(req.params.id, function(err, guitar){
    res.send(guitar);
  })
});

app.post('/guitars', function create(req, res){
  var newGuitar = req.body;
  console.log(newGuitar);
  db.Guitar.create(newGuitar, function(err, ng){
    if(err){console.log(err)}
    db.Guitar.find({}, function(err, guitars){
      res.send(guitars);
    });
  });
});

app.put('/guitars/:id', function update(req, res){
  var updatedG = req.body;
  db.Guitar.findOne({_id: req.params.id}, function(err, guitar){
    if(err){console.log(err)}
    guitar.brand = updatedG.brand;
    guitar.model = updatedG.model;
    guitar.pickups = updatedG.pickups;
    guitar.neck_construction = updatedG.neck_construction;
    guitar.save(function(err){
      if(err){console.log(err)}
      db.Guitar.find({}, function(err, guitars){
        res.send(guitars);
      });
    });
  });
});

app.delete('/guitars/:id', function(req, res){
  db.Guitar.remove({_id: req.params.id}, function(err, guitar){
    console.log('guitar deleted');
    res.redirect('/guitars');
  });
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/Nick-Brennan/express-personal-api/README.md", // CHANGE ME
    base_url: "http://shrouded-crag-80181.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/campsites", description: "E.g. Create a new campsite"} // CHANGE ME
    ]
  })
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
