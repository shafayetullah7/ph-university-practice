import jwt from "jsonwebtoken";
export const createToken = (
  payload: { userId: string; role: string },
  secret: string,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn,
  });
  return token;
};
