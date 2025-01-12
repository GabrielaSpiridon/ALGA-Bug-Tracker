
import { getUserByEmailAndPassword, createUser } from '../models/userModel.js';


export async function login(req, res) {
  const { user_email, password } = req.body;

  // Check that required parameters are provided
  if (!user_email || !password) {
    return res.status(400).send("Missing parameters");
  }

  // Query the database for the user
  const user = await getUserByEmailAndPassword(user_email, password);
  if (user) {
    // If user is found, return the user ID. In a real app, consider generating a JWT or session token.
    return res.json({ userId: user.id_user });
  } else {
    // If no user is found, return an error response
    return res.status(404).send("unknown user");
  }
}


export async function register(req, res) {
  const { user_email, user_name, password } = req.body;

  // Check that required parameters are provided
  if (!user_email || !user_name || !password) {
    return res.status(400).send("Missing parameters");
  }

  const userId = await createUser(user_email, user_name, password);
  if (userId) {
    // User successfully created; return the new user's ID
    return res.json({ userId: Number(userId) });
  } else {
    return res.status(500).send("unable to create user");
  }
}
