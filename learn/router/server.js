// routes/admin.js
const router = express.Router();
const verifyAdmin = require('../middleware/verifyAdmin');

// Apply this middleware to EVERY route in this specific file
router.use(verifyAdmin); 

// router.get('/dashboard', ...); // Protected!
// router.get('/delete-user', ...); // Protected!
// router.get('/settings', ...); // Protected!

module.exports = router;