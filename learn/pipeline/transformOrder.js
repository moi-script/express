const transformOrder = (req, res, next) => {
  const { productId, quantity, notes } = req.body; // assume

  // Normalize productId to string and trim whitespace
  if (productId) req.body.productId = String(productId).trim();
  // Convert quantity to number (default 1 if missing)
  req.body.quantity = quantity ? Number(quantity) : 1;

  // Optional: trim notes if provided
  if (notes) req.body.notes = String(notes).trim();

  // Optional: add timestamp for controller convenience
  req.body.createdAt = new Date();

  next(); 
}