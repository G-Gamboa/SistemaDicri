import { login } from "../services/authService.js";

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await login(email, password);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
