import jwt from "jsonwebtoken";

const genAuthToken = (user) => {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      secondName: user.secondName,
      email: user.email,
    },
    secretKey
  );

  return token;
};

export default genAuthToken;
