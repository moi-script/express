


// Validation
//  → Authentication
//  → Authorization
//  → Controller


// app.post(
//   "/orders",
//   transformOrder,       // normalize input
//   validateOrderInput,   // express-validator
//   inspect,              // logs request
//   gatekeeper,           // authenticate JWT
//   roleBouncer("user"),  // authorize role
//   zipper,               // attach extra context
//   createOrderController // <-- controller
// );
