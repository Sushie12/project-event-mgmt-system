const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    if (!token.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Token format is invalid' });
    }

    const actualToken = token.split(' ')[1];
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    // Attach user info to req.user
    req.user = { userId: decoded.id || decoded.userId };

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = protect;







// const jwt = require('jsonwebtoken');

// // Middleware function to protect routes
// const protect = (req, res, next) => {
//   const token = req.header('Authorization'); // Get token from header

//   // If no token is present, deny access
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

//     // Ensure req.user has userId
//     req.user = { userId: decoded.id || decoded.userId }; // decoded.id if you signed JWT with id
//     next();
//   } catch (err) {
//     // If token verification fails
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// module.exports = protect;
