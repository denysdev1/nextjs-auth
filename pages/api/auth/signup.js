import { hashPassword } from "../../../utils/auth";
import { connectToDatabase } from "../../../utils/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !email.includes("@") || password.length < 7) {
      res.status(422).json({
        message:
          "Invalid input - password also should be at least 7 characters long. ",
      });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      res
        .status(422)
        .json({ message: "User with this credentials already exists!" });
      client.close(); 
      return;
    }

    const hashedPassword = await hashPassword(password);

    await db.collection("users").insertOne({
      email,
      password: hashedPassword,
    });

    client.close();
  }
};

export default handler;
