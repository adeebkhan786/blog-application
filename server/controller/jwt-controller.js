import jwt from "jsonwebtoken";



// middleware me hmesha next v hota hai.
export const authenticateToken = async (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return response.status(401).json({
      msg: 'Token is missing'
    })
  };

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) {
      return response.status(403).json({
        msg: 'Invalid Token'
      })
    };

    request.user = user;
    next();
  })
}