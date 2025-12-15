

// Logs

// Tracks

// Audits

// Measures

// It usually:

export const inspect = () => {
  console.log("Method:", req.method);
  console.log("Path:", req.originalUrl);
  console.log("IP:", req.ip);
  console.log("Body:", req.body);
  console.log("Params:", req.params);
  console.log("Query:", req.query);
  console.log("-----------------");

  next();
}