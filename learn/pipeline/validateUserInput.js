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


// transform -->  npm install express-validator
// Does this request meet the business rules  
import { body, validationResult } from 'express-validator';


// should be put first before sanitazion  
export const initValidatorRules = () => {
    return {
        isEmail :  body('email').isEmail(),
        isPassLength : body('password').isLength({ min: 5 })
    }
}

export const sanitized = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}


