

// The GateKeeper 

// The Data processor

// The safety net

// The third party hero  - morgan -> log every request
//                       - CORS -> hanlde corse and preflight

// npm install morgan cors 



// The bouncers 
// npm install express-rate-limit







// Global middle ware 

app.use((req, res, next) => {
  console.log('I run on everything!');
  next();
});

// use starts manage the searching for every matches like '/' to match every use cases



// local
// app.get, app.post, app.put, app.delete,

