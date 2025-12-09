
// Response 

// res.send(string | html | json); html or json automatic

// res.json(json); force to form json header

// res.status(200); -> set the status, res.status(status).json();

// res.redirect(/newpage); -> go to different url

// res.sendFile(absolute path); -> send files img/pdf/html etc 




// Request 

// [req.params] -> get url variable
// http://localhost:3000/users/500

// routes 
// /users/:id
// req.params.id -> 500




// [req.query] -> query strings 
// http://localhost:3000/search?term=pizza&sort=price

// req.query.term ->  pizza
// req.query.sort ->  price




// [req.body] -> needs to process json, app.use(express.json)

// req.body.userName
// req.body.password

// req.headers | req.get(header) -> reads meta data or authentication 

