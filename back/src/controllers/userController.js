import User from "../models/user.js";
import genAuthToken from "../utils/genAuthToken.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log("🚀 ~ password:", password);
  console.log("🚀 ~ email:", email);

  try {
    const user = await User.signIn(email, password);
    console.log("🚀 ~ user:", user);

    const token = genAuthToken(user);

    res.status(200).json({
      firstName: user.firstName,
      secondName: user.secondName,
      email: email,
      token: token,
      likedProducts: user.likedProducts,
      image: user.image,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//todo test
//todo what if user sign in with service, but does not have picture and service does not provide one? research it
export const signUp = async (req, res) => {
  const { firstName, secondName, email, password } = req.body;

  try {
    const user = User.signUp(firstName, secondName, email, password);
    const token = createToken(user._id);
    res.status(200).json({
      firstName: user.firstName,
      secondName: user.secondName,
      email: email,
      token: token,
      likedProducts: user.likedProducts,
      image: user.image,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//todo test and fix this
export const addLikedProduct = async (req, res) => {
  const { userId } = req.query;
  const product = req.body;

  try {
    await User.updateOne(
      { _id: userId },
      { $push: { likedProducts: productId } }
    );
    res.status(200).json({ message: "Product liked successfully." });
  } catch (err) {
    console.error(`error: ${err}`);
    res
      .status(500)
      .json({ error: "An error occurred while liking the product." });
  }
};
