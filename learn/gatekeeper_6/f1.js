// authorization / authentication 


const requireAdmin = (req, res, next) => {
  // Imagine we check a header or a cookie here
  const isAdmin = req.get('X-Is-Admin') === 'true';

  if (isAdmin) {
    next(); // Allowed! Proceed to the next step.
  } else {
    // Blocked! Send a 403 Forbidden response.
    res.status(403).json({ error: 'Access Denied: Admins only.' });
  }
};

// Usage
app.get('/admin/secrets', requireAdmin, (req, res) => {
  res.send('Here are the nuclear launch codes.');
});