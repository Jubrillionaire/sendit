import jwt from "jsonwebtoken";


export const tokenGenerator = (user, callback) => {
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      password: user.password,
      role: user.role
    },
    process.env.SECRET,
    { expiresIn: "24h" },
    (err, res) => {
      callback(err, res);
    }
  );
};

export const authorizeUser = (req, res, next) => {
    const token = req.headers.authorization || req.headers["x-access-token"] || req.body.token;
     if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          res.send(err);
        } else { 
          req.decoded = decoded;
          next();
        } 
      });
    } else {
      res.status(401).json({
        status: "Failed",
        message: "Authentication required for this route"
      });
    }
  };
  
