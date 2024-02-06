import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      const error = new Error("Not authenticated!");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];

    let decodedToke = jwt.verify(token, "indiaIsBetterThenPakistan");

    if (!decodedToke) {
      const error = new Error("Invalid authorization");
      error.statusCode = 401;
      throw error;
    }

    req.userId = decodedToke.userId;
    next();
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};
