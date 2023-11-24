const jwt = require("jsonwebtoken")

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
    req.userId = decoded.userId
    next()
  } catch (e) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

module.exports = authenticateUser;