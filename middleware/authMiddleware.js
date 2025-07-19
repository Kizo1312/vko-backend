import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // 1. Check if token is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Nedostaje token.' });
  }

  const token = authHeader.split(' ')[1]; // Get the actual token

  try {
    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user info to request
    req.user = decoded;

    // 4. Continue to next middleware or route
    next();
  } catch (err) {
    console.error('Nevažeći token:', err.message);
    return res.status(401).json({ error: 'Nevažeći token.' });
  }
}
