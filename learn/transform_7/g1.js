const trimInputs = (req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim();
      }
    }
  }
  next();
};

// Usage
app.use(express.json()); // Need this to read the body first
app.post('/signup', trimInputs, (req, res) => {
  // If user sent "  john@email.com  ", it is now "john@email.com"
  console.log(req.body.email); 
  res.send('Data received and cleaned!');
});